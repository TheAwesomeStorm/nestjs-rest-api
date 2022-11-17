import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async readAll() {
    return this.users;
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
