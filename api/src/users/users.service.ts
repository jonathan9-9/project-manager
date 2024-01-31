import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  // sign up the user
  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    console.log('USER CREATED:', createUserDto);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    const user = this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(params: {
    updateUserDto: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { updateUserDto, where } = params;
    return this.prisma.user.update({
      data: updateUserDto,
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
