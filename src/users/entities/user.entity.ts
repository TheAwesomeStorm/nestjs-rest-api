import { AutoMap } from '@automapper/classes';

export class UserEntity {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
}
