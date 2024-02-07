import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'emily',
      password: 'ewrtyuii',
      provider: 'local',
    },
    {
      userId: 2,
      username: 'joseph',
      password: 'lkgrtyuiohg',
      provider: 'local',
    },
  ];

  async findOne(filterFn: (user: User) => boolean): Promise<User | undefined> {
    return this.users.find(filterFn);
  }

  async add(user: Omit<User, 'userId'>) {
    const lastId = this.users.sort((a, b) => a.userId - b.userId)[0].userId;
    const userData = { ...user, userId: lastId + 1 };
    this.users.push(userData);
    return userData;
  }
}
