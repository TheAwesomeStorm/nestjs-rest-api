import { AutoMap } from '@automapper/classes';

export class UserReadDto {
  @AutoMap()
  readonly id: number;

  @AutoMap()
  readonly name: string;

  @AutoMap()
  readonly email: string;
}
