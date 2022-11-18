import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsEmailUnique } from '../validators/unique-email.validator';

export class UserUpdateDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @AutoMap()
  @IsEmail()
  @IsEmailUnique()
  @IsOptional()
  email?: string;

  @AutoMap()
  @MinLength(8)
  @IsOptional()
  password?: string;
}
