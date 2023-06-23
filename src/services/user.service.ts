import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService, private readonly authService: AuthService) {}

  async registerUser(username: string, password: string): Promise<string> {
    try {
      // Check if the username already exists in the database
      const existingUser = await this.dbService.getUserByUsername(username);

      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Add the new user to the database
      const userId = await this.dbService.addUser(username, password);

      return userId; // Return the ID of the newly created user document
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  async loginUser(username: string, password: string): Promise<string> {
    try {
      // Get the user from the database
      const user = await this.dbService.getUserByUsername(username);

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the password matches
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Generate JWT token using the authService
      const token = this.authService.generateJwtToken(user.username);

      return token;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Failed to log in user');
    }
  }
}