import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserCreateDto } from './dto/user-create.dto';
import { UserReadDto } from './dto/user-read.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: EntityRepository<UserEntity>,
  ) {}

  async save(userData: UserCreateDto) {
    const user = this.mapper.map(userData, UserCreateDto, UserEntity);
    const createdUserId = await this.userRepository.nativeInsert(user);
    return this.readById(createdUserId);
  }

  async readAll() {
    const users = await this.userRepository.findAll();
    return this.mapper.mapArrayAsync(users, UserEntity, UserReadDto);
  }

  async readById(id: number) {
    const user = await this.userRepository.findOne({ id });
    return this.mapper.mapAsync(user, UserEntity, UserReadDto);
  }

  async updateUser(id: number, userData: UserUpdateDto) {
    await this.userRepository.nativeUpdate({ id }, userData);
    return await this.readById(id);
  }

  async deleteUser(id: number) {
    return await this.userRepository.nativeDelete({ id });
  }
}
