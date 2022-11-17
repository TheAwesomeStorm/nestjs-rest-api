import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserCreateDto } from './dto/user-create.dto';
import { UserReadDto } from './dto/user-read.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async save(userData: UserCreateDto) {
    const user = this.mapper.map(userData, UserCreateDto, UserEntity);
    user.id = uuid();
    this.users.push(user);
    return this.mapper.map(user, UserEntity, UserReadDto);
  }

  async readAll() {
    return this.mapper.mapArray(this.users, UserEntity, UserReadDto);
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async updateUser(id: string, userData: Partial<UserEntity>) {
    const user = this.users.find((user) => user.id === id);

    if (!user)
      throw new Error(`There is not an user with with ID ${id} to update`);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user[key] = value;
    });

    return user;
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
