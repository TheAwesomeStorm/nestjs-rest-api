import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserCreateDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @IsEmail()
  email: string;

  @AutoMap()
  @MinLength(8)
  password: string;
}
