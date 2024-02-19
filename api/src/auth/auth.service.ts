import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { AccountDetailsDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    try {
      if (!username || !pass) {
        throw new BadRequestException('something went wrong', {
          cause: new Error(),
          description: 'Username and password are both required',
        });
      }
      const user = await this.usersService.findOne(username);

      const passwordMatch = await bcrypt.compare(pass, user?.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      const payload = { sub: user.id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Unexpected error at sign in', error);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }
  }

  async signUp(
    username: string,
    password: string,
    email: string,
    name: string,
    photo: string,
  ): Promise<UserModel> {
    const createdUser = await this.usersService.create({
      username,
      password,
      email,
      name,
      photo,
    });
    return createdUser;
  }

  async getProfileInfo(username: string): Promise<object> {
    console.log('USERNAME', username);
    const user = await this.usersService.findOne(username);

    return {
      name: user.name,
      email: user.email,
      username: user.username,
      photo: user.photo,
    };
  }

  async editAccountDetails(accountDetailsDto: AccountDetailsDto) {
    console.log('ACCOUNT DETAIL DTO', accountDetailsDto);
  }
}
