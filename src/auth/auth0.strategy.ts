import { Strategy } from 'passport-auth0';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private authService: AuthService) {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid email profile',
      state: false,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { displayName: string; user_id: string },
  ): Promise<any> {
    console.log('calling validate');
    const user = await this.authService.validateAuth0User({
      username: profile.displayName,
      id: profile.user_id,
    });

    console.log(_accessToken);
    console.log(profile);
  
    return user;
  }
}
