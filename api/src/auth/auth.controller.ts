import {
  Controller,
  Body,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Public } from './decorators/public.decorator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

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

export class AccountDetailsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  value: string;
}

export class EmailDto {
  @IsEmail(undefined, { message: 'Please enter a valid email address' })
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}

export class NewPassDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newPassword: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  token: string;
}

export class ProjectDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;
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

    console.log('signup user created');

    return {
      message: 'User was created successfully',
      userId: result.id,
      userName: result.username,
    };
  }

  @Get('profile')
  getProfileInfo(@Request() req) {
    console.log('Request', req);
    return this.authService.getProfileInfo(req.user.sub);
  }

  @Post('edit-account-details')
  editAccountDetails(@Body() accountDetailsDto: AccountDetailsDto) {
    return this.authService.editAccountDetails(accountDetailsDto);
  }

  @Public()
  @Post('reset-password')
  resetPasswordByEmail(@Body() body: EmailDto) {
    console.log('email', body);
    return this.authService.resetPasswordByEmail(body.email);
  }

  @Public()
  @Post('save-new-password')
  saveNewPassword(@Body() body: NewPassDto) {
    console.log('NEW PASSWORD', body.newPassword);
    return this.authService.saveNewPassword(
      body.newPassword,
      body.id,
      body.token,
    );
  }

  @Post('delete-user')
  deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user.sub);
  }

  // get users' projects
  @Get('user-projects')
  getProjects(@Request() req) {
    console.log('request', req.user);
    return this.authService.getProfileInfo(req.user.sub);
  }

  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }
}
