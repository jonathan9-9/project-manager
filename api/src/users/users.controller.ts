import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<UserModel | undefined> {
    try {
      const user = await this.usersService.findOne(username);
      return user;
    } catch (error) {
      console.log('error extracting payload from token', error.message);
      throw error;
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateUser({ id: +id }, updatedUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove({
      id: +id,
    });
  }
}
