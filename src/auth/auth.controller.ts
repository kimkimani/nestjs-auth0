import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route using local authentication strategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Auth0 callback route
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Request() req) {
    return this.authService.login(req.user);
  }

  // Auth0 login route
  @Get('auth0/login')
  @UseGuards(AuthGuard('auth0'))
  async auth0Login() {
    // No explicit implementation is needed here as AuthGuard handles the authentication flow
  }
}
