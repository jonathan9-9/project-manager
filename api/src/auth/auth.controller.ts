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
import { Public } from './decorators/public.decorator';

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

  @IsString()
  @IsNotEmpty()
  password: UserModel['password'];

  @IsEmail()
  @IsNotEmpty()
  email: UserModel['email'];

  @IsString()
  @IsNotEmpty()
  name: UserModel['name'];

  @IsString()
  @IsNotEmpty()
  photo: UserModel['photo'];
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  //inside auth controller public decorator enables user creation

  @Public()
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createUser(@Body() signUpDto: SignUpDto) {
    const { username, password, email, name, photo } = signUpDto;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const result = await this.authService.signUp(
      username,
      hashedPassword,
      email,
      name,
      photo,
    );

    return {
      message: 'User was created successfully',
      userId: result.id,
      userName: result.username,
    };
  }
}
