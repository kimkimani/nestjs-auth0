import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Auth0Strategy } from './auth0.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // UserModule to access user-related functionalities
    UserModule, 
    // Import PassportModule for setting up authentication middleware
    PassportModule, 
    // JwtModule for handling JWT tokens
    JwtModule.register({ 
      // the secret key for signing JWT tokens
      secret: 'werferfe', 
      // token expiration time
      signOptions: { expiresIn: '60s' }, 
    }),
  ],
  providers: [ 
    // Define providers for the AuthService and authentication strategies
    AuthService,
    LocalStrategy,
    Auth0Strategy,
  ],
  // App controllers
  controllers: [
    AuthController
  ],
  // Export AuthService. it makes it available for dependency injection in other modules
  exports: [AuthService], 
})
export class AuthModule {}
