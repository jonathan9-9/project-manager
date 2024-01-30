import {
  Controller,
  Body,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

class SignInDto {
  @IsString()
  username: UserModel['username'];

  @IsString()
  password: UserModel['password'];
}

class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: UserModel['username'];

  @IsEmail()
  @IsNotEmpty()
  email: UserModel['email'];

  @IsString()
  @IsNotEmpty()
  name: UserModel['name'];

  @IsString()
  @IsNotEmpty()
  password: UserModel['password'];

  @IsString()
  @IsNotEmpty()
  photoUrl: UserModel['photo'];
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createUser(@Body() signUpDto: SignUpDto) {
    const { username, email, password, name, photoUrl } = signUpDto;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const result = await this.authService.signUp(
      username,
      email,
      hashedPassword,
      name,
      photoUrl,
    );

    return {
      message: 'User was created successfully',
      userId: result.id,
      userName: result.username,
    };
  }
}
