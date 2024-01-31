import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // add bcrypt to hash password and compare input pass with stored password

  // if (user?.password !== pass) {
  //   throw new UnauthorizedException();
  // }
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    const passwordMatch = await bcrypt.compare(pass, user?.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
}
