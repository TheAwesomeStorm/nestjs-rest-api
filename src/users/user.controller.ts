import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUserAsync(@Body() userData: UserCreateDto) {
    const user: UserEntity = {
      id: uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    await this.userRepository.save(user);
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Read all users' })
  async readUsersAsync() {
    return await this.userRepository.readAll();
  }
}
