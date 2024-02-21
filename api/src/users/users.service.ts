import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    console.log('USER CREATED:', createUserDto);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  // find a user by username
  async findOne(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // find a user by email
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    return user;
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}

// async findOne(id: number) {
//   return this.prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
// }
