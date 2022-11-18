import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { UserEntity } from '../entities/user.entity';
import { UserReadDto } from '../dto/user-read.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserEntity, UserReadDto);
      createMap(
        mapper,
        UserCreateDto,
        UserEntity,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        UserUpdateDto,
        UserEntity,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
