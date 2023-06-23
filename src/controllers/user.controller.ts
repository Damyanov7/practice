import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<string> {
    const { username, password } = registerUserDto;
    return this.userService.registerUser(username, password);
  }

  @Post('login')
  async loginUser(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<string> {
    const { username, password } = loginUserDto;
    const token = await this.userService.loginUser(username, password);
    return token;
  }
}