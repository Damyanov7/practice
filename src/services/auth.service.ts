import { Injectable } from '@nestjs/common';
import { verify, sign, SignOptions } from 'jsonwebtoken';
import { config } from 'dotenv';
import { DbService } from './db.service';

config(); // Load environment variables from .env file

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService) {}

  generateJwtToken(username: string): string {
    try {
      const signOptions: SignOptions = {
        expiresIn: '1h', // Set token expiration time
        algorithm: 'HS256', // Specify the signing algorithm
      };

      // Generate JWT token
      const token = sign({ username }, process.env.SECRET_KEY, signOptions);

      return token;
    } catch (error) {
      console.error('Failed to generate JWT token:', error);
      throw new Error('Failed to generate JWT token');
    }
  }

  async validateJwtToken(token: string): Promise<string | null> {
    try {
      // Verify and decode the JWT token
      const decoded = verify(token, process.env.SECRET_KEY) as { username: string };

      console.log('Decoded JWT token:', decoded);

      // Check if the decoded username exists in the database
      const user = await this.dbService.getUserByUsername(decoded.username);

      if (!user) {
        console.log('User not found in the database');
        return null; // User not found in the database
      }

      console.log('Validated JWT token for user:', user.username);
      return decoded.username; // Return the validated username
    } catch (error) {
      console.error('Error validating JWT token:', error);
      return null; // Token is invalid or expired
    }
  }
}