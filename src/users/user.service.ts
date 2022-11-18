import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserCreateDto } from './dto/user-create.dto';
import { UserReadDto } from './dto/user-read.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(userData: UserCreateDto) {
    const user = this.mapper.map(userData, UserCreateDto, UserEntity);
    const createdUser = await this.userRepository.save(user);
    return this.mapper.map(createdUser, UserEntity, UserReadDto);
  }

  async readAll() {
    const users = await this.userRepository.find();
    return this.mapper.mapArrayAsync(users, UserEntity, UserReadDto);
  }

  async readById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return this.mapper.mapAsync(user, UserEntity, UserReadDto);
  }

  async updateUser(id: number, userData: UserUpdateDto) {
    const user = this.mapper.map(userData, UserUpdateDto, UserEntity);
    await this.userRepository.update(id, user);
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
