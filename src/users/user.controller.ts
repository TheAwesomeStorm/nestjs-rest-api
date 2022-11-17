import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() userData: UserDto): Promise<UserDto> {
    await this.userRepository.save(userData);
    return userData;
  }
}
