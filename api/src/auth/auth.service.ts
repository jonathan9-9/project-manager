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
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user: UserModel, secret?: string) {
    const payload = { sub: user.id };
    if (secret) {
      return this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '5m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
  }

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
    const user = await this.usersService.findOne(accountDetailsDto.username);

    if (accountDetailsDto.field === 'password') {
      const unencryptedPassword = accountDetailsDto.value;
      const hashedPassword = await this.hashPassword(unencryptedPassword);
      user[accountDetailsDto.field] = hashedPassword;
    } else {
      // Dynamically update the field based on the 'field' property in the DTO
      user[accountDetailsDto.field] = accountDetailsDto.value;
    }

    // Save the field property value in the database

    const updatedUser = await this.usersService.updateUser(
      { id: user.id },
      user,
    );

    return {
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    };
  }

  async resetPasswordByEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('email not found');
    }
    const token = await this.createAccessToken(user, user.password);

    return this.mailService.sendPasswordResetEmail(user, token);
  }

  async saveNewPassword(newPassword: string, id: number, token: string) {
    const user = await this.usersService.findUserById(id);

    const payload = await this.jwtService.verifyAsync(token, {
      secret: user.password,
    });

    console.log('PAYLOAD', payload);
  }
}
