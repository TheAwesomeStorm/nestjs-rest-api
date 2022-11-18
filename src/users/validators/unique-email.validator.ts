import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: EntityRepository<UserEntity>,
  ) {}

  async validate(value: any): Promise<boolean> {
    const user = await this.userRepository.findOne({ email: value });
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
