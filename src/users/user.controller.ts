import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { UserReadDto } from './dto/user-read.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUserAsync(@Body() userData: UserCreateDto) {
    const user: UserEntity = {
      id: uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    await this.userService.save(user);
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Read all users' })
  async readUsersAsync() {
    const users = await this.userService.readAll();
    return users.map((user) => new UserReadDto(user.id, user.name));
  }

  @Put('/:id')
  async updateUserAsync(
    @Param('id') id: string,
    @Body() userData: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, userData);
  }
}
