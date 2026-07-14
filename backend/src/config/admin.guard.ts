import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from './auth.util';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Admin permission required.');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (!verifyToken(token)) {
      throw new UnauthorizedException('Invalid or expired admin session.');
    }
    return true;
  }
}
