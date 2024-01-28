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
import { IsString } from 'class-validator';
// isNotEmpty from class-validator

class SignInDto {
  @IsString()
  username: UserModel['username'];

  @IsString()
  password: UserModel['password'];
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
}
