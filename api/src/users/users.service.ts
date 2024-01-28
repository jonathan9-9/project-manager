import { Injectable } from '@nestjs/common';
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
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
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

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
