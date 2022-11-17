import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validators/unique-email.validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmailUnique()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
