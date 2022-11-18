import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { IsEmailUnique } from '../validators/unique-email.validator';

export class UserCreateDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @AutoMap()
  @MinLength(8)
  password: string;
}
