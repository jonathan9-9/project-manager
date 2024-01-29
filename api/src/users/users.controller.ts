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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<UserModel | undefined> {
  //   return this.usersService.findOne(+id);
  // }
  @Get(':username')
  findOne(@Param('id') username: string): Promise<UserModel | undefined> {
    return this.usersService.findOne(username);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateUser({
      where: { id: +id },
      updateUserDto: updatedUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove({
      id: +id,
    });
  }
}
