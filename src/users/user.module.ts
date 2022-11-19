import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProfile } from './profiles/user.profile';
import { UserEntity } from './entities/user.entity';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserProfile, UniqueEmailValidator],
})
export class UserModule {}
