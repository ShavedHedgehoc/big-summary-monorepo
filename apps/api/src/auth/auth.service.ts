import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import User from '../users/users.model';
import { TokenService } from '../token/token.service';

import * as mapper from './mapper';
import UserRoles from '../user-roles/user-roles.model';

export interface AuthResponse {
  user: mapper.IUserData;
  accessToken: string;
}

interface JwtPayload {
  id: number;
  email: string;
  roles: UserRoles[];
  iat: Date;
  exp: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  private cleanJWT(token: JwtPayload): Record<string, unknown> {
    const { iat: _iat, exp: _exp, ...cleanToken } = token;
    return cleanToken;
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
    return [
      {
        user: mapper.toRegisteredUserData(user),
        accessToken: tokens.accessToken,
      },
      tokens.refreshToken,
    ];
  }

  async register(dto: CreateUserDto): Promise<[AuthResponse, string]> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);

    return [
      {
        user: mapper.toRegisteredUserData(user),
        accessToken: tokens.accessToken,
      },
      tokens.refreshToken,
    ];
  }
  async refresh(token: string) {
    if (!token) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
    const userData = this.verifyToken(token);
    const userId = userData['id'] as number;
    if (!userId) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.getByPk(userId);
    if (!user) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
    const tokenFromDb = await this.tokenService.findByToken(user.id, token);
    if (!tokenFromDb) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
    return [
      {
        user: mapper.toRegisteredUserData(user),
        accessToken: tokens.accessToken,
      },
      tokens.refreshToken,
    ];
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUser(refreshToken: string): Promise<mapper.IUserData | null> {
    if (!refreshToken) return null;
    const userData = this.verifyToken(refreshToken);
    const userId = userData['id'] as number;
    if (!userId) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.getByPk(userId);
    if (!user) {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }

    const tokenFromDb = await this.tokenService.findByToken(user.id, refreshToken);
    if (tokenFromDb) {
      return mapper.toRegisteredUserData(user);
    }

    return null;
  }

  verifyToken(token: string): Record<string, unknown> {
    try {
      const userData = this.jwtService.verify<JwtPayload>(token, {
        secret: 'JWT_REFRESH_SECRET',
      });

      return this.cleanJWT(userData); // Ошибок больше не будет
    } catch {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
  }

  verifyAccessToken(token: string): Record<string, unknown> {
    try {
      const userData = this.jwtService.verify<JwtPayload>(token, {
        secret: 'JWT_ACCESS_SECRET',
      });
      return this.cleanJWT(userData);
    } catch {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
  }

  async getTokens(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'JWT_ACCESS_SECRET',
        expiresIn: '30m', //"15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: 'JWT_REFRESH_SECRET',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout() {}

  async check(authHeader: string) {
    try {
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const userData = this.verifyAccessToken(token);
      const userId = userData['id'] as number;
      if (!userId) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const user = await this.userService.getByPk(userId);
      if (user) {
        return { user: mapper.toRegisteredUserData(user), accessToken: token };
      }
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }

  private async validateUser(dto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND);
    }
    if (user.banned) {
      throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
    }
    const passEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный пароль' });
  }
}
