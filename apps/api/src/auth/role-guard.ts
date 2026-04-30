import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import Role from '../roles/roles.model';
import User from '../users/users.model';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest<RequestWithUser>();
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
          throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        const userPayload = this.jwtService.verify<Record<string, any>>(token, {
          secret: 'JWT_ACCESS_SECRET',
        });

        const user = userPayload as User;
        req.user = user;

        return user.roles.some((role: Role) => requiredRoles.includes(role.value));
      } catch (e) {
        if (e instanceof UnauthorizedException) throw e;
        throw new HttpException('Прав недостаточно (Role guard)', HttpStatus.FORBIDDEN);
      }
    } catch {
      throw new HttpException('Прав недостаточно (Role guard)', HttpStatus.UNAUTHORIZED);
    }
  }
}
