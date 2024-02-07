import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Method to validate username and password
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(
      (user) => user.username === username,
    );
    if (user && user.password === pass) {
      const { password: _, ...result } = user; // Remove password from the returned user object
      return result; // Return user information excluding the password
    }
    return null; // Return null if user is not found or password doesn't match
  }

  // Method to generate JWT token upon successful login
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT token using user information
    };
  }

  // Method to validate Auth0 user
  async validateAuth0User({ username, id }: { username: string; id: string }) {
    let user = await this.usersService.findOne(
      (user) => user.provider === 'auth0' && user.provider_id === id,
    );
    if (!user) {
      // If user doesn't exist, add the user to the database
      user = await this.usersService.add({
        password: '', // No password since it's an Auth0 user
        provider: 'auth0',
        username: username,
        provider_id: id,
      });
    }
    const { password: _, ...result } = user; // Remove password from the returned user object
    return result; // Return user information excluding the password
  }
}
