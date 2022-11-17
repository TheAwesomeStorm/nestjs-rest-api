import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  async save(user: UserDto) {
    this.users.push(user);
  }

  async readAll() {
    return this.users;
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
