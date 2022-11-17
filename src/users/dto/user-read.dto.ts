import { AutoMap } from '@automapper/classes';

export class UserReadDto {
  @AutoMap()
  readonly id: string;

  @AutoMap()
  readonly name: string;
}
