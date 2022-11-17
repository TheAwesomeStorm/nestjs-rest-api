import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validators/unique-email.validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmailUnique()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
