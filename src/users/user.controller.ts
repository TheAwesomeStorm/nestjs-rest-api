import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUserAsync(@Body() userData: UserCreateDto) {
    return await this.userService.save(userData);
  }

  @Get()
  @ApiOperation({ summary: 'Read all users' })
  async readUsersAsync() {
    return await this.userService.readAll();
  }

  @Get('/:id')
  async readUserByIdAsync(@Param('id') id: number) {
    return await this.userService.readById(id);
  }

  @Put('/:id')
  async updateUserAsync(
    @Param('id') id: number,
    @Body() userData: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, userData);
  }

  @Delete('/:id')
  async deleteUserAsync(@Param('id') id: number) {
    const deletedUserId = await this.userService.deleteUser(id);
    return { message: `User with ID ${deletedUserId} was successful deleted` };
  }
}
