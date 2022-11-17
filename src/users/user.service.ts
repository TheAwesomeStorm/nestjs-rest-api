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

  async updateUser(id: string, userData: Partial<UserEntity>) {
    const user = this.users.find((user) => user.id === id);

    if (!user)
      throw new Error(`There is not an user with with ID ${id} to update`);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user[key] = value;
    });

    return user;
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
