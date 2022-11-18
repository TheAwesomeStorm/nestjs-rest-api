import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async validate(value: any): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email: value });
    return !user;
  }

  defaultMessage(): string {
    return 'An user with this email already exists';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return (obj: any, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
}
