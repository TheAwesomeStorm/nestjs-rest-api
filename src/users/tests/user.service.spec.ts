import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { UserEntity } from '../entities/user.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfile } from '../profiles/user.profile';

describe(UserService.name, () => {
  let userService: UserService;

  const users: UserEntity[] = [
    {
      id: 1,
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    },
  ];

  const mockedUserRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve(users);
    }),
    findOne: jest.fn().mockImplementation((options) => {
      const index = users.findIndex((user) => user.id === options.id);
      return Promise.resolve(users[index]);
    }),
    nativeDelete: jest.fn().mockImplementation((options) => {
      const index = users.findIndex((user) => user.id === options.id);
      users.splice(index, 1);
      return options.id;
    }),
    nativeInsert: jest.fn().mockImplementation((user: UserEntity) => {
      return users.push({
        id: users.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }),
    nativeUpdate: jest.fn().mockImplementation(() => {
      return 0;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockedUserRepository,
        },
        UserProfile,
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return all users', async () => {
    const result = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
    expect(await userService.readAll()).toEqual(result);
  });

  it('should return user by id', async () => {
    const id = 1;
    const user = users[id - 1];
    const result = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    expect(await userService.readById(id)).toEqual(result);
  });

  it('should remove user by id', async () => {
    expect(await userService.deleteUser(1)).toEqual(1);
    expect(users.length).toBe(0);
  });

  it('should create user', async () => {
    const userDto = {
      name: 'mock',
      email: 'mock@mock.com',
      password: 'password',
    };
    expect(await userService.save(userDto)).toEqual({
      id: users.length,
      name: userDto.name,
      email: userDto.email,
    });
  });

  it('should update user', async () => {
    const id = 1;
    expect(
      await userService.updateUser(id, { email: 'mock@mock.com' }),
    ).toEqual({
      id,
      name: users[id - 1].name,
      email: 'mock@mock.com',
    });
  });
});
