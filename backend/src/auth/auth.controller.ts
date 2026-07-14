import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { generateToken, verifyToken } from '../config/auth.util';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'muneebcodes_secure_admin';

    if (username === adminUser && password === adminPass) {
      const token = generateToken(username);
      return { token, username };
    }
    throw new UnauthorizedException('Invalid admin credentials.');
  }

  @Post('verify')
  async verify(@Body() body: any) {
    const { token } = body;
    const isValid = verifyToken(token);
    return { valid: isValid };
  }
}
