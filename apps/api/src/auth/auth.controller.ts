import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthResponse, AuthService } from './auth.service';
import { Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const [res, refreshToken] = await this.authService.login(dto);
    response.cookie('refreshToken', refreshToken);
    return res;
  }

  @UsePipes(ValidationPipe)
  @Post('/register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const [res, refreshToken] = await this.authService.register(dto);
    response.cookie('refreshToken', refreshToken);
    return res;
  }

  // @Post('/refresh')
  // async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
  //   const [res, refreshToken] = await this.authService.refresh(request.cookies['refreshToken']);
  //   response.cookie('refreshToken', refreshToken);
  //   return res;
  // }

  @Post('/refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    // Приводим к типу, чтобы избежать any
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies['refreshToken'];

    if (!token) {
      throw new HttpException('no token', HttpStatus.UNAUTHORIZED);
    }

    const [res, refreshToken] = await this.authService.refresh(token);
    response.cookie('refreshToken', refreshToken);
    return res;
  }

  @Post('/check')
  async check(@Req() request: Request) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Authorization header is missing', HttpStatus.UNAUTHORIZED);
    }
    const res = await this.authService.check(authHeader);
    return res;
  }

  // for tanstack auth get user info

  @Post('/get_user')
  @HttpCode(200)
  async getUser(@Req() request: Request) {
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies['refreshToken'];
    if (!token) {
      throw new HttpException('no token', HttpStatus.UNAUTHORIZED);
    }
    const res = await this.authService.getUser(token);
    return res;
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies['refreshToken'];

    if (token) {
      await this.tokenService.removeToken(token);
    }
    response.clearCookie('refreshToken', { httpOnly: true, path: '/' });
    return { success: true };
  }
}
