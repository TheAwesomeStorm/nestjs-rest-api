import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator],
})
export class UserModule {}
