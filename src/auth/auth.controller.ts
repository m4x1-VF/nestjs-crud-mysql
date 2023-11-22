import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    email: string;
    id: string;
    role: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
