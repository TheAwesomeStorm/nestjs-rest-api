import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProfile } from './profiles/user.profile';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserProfile],
})
export class UserModule {}
