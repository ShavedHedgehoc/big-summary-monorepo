import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtAuthguard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      try {
        const user = this.jwtService.verify<Record<string, any>>(token, {
          secret: 'JWT_ACCESS_SECRET', // В идеале: process.env.JWT_ACCESS_SECRET
        });

        req['user'] = user;

        return true;
      } catch {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }
    } catch {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
