import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity {
  @AutoMap()
  @PrimaryKey()
  id: number;

  @AutoMap()
  @Property()
  name: string;

  @AutoMap()
  @Property()
  email: string;

  @AutoMap()
  @Property()
  password: string;
}
