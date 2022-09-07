import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../../../../src/infrastructure/models/user.model';
import { DatabaseUserRepository } from '../../../../src/infrastructure/repositories/user.repository';
import {
  Connection,
  Repository,
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getUserValidForTest } from '../../domain/fakeForTest/userForTest';

describe('DatabaseUserRepository', () => {
  let userRepository: DatabaseUserRepository;
  let repositoryInMemory: Repository<UserModel>;
  let testingModule: TestingModule;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        DatabaseUserRepository,
        {
          provide: getRepositoryToken(UserModel),
          useClass: Repository,
        },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [UserModel],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repositoryInMemory = getRepository(UserModel, testConnectionName);
    userRepository = new DatabaseUserRepository(repositoryInMemory);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('Should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('FindByEmail', () => {
    it('Returns null if it does not find the registered email', async () => {
      expect(await userRepository.findByEmail('test@test.com')).toStrictEqual(
        null,
      );
    });

    it('Returns the user if it finds the email', async () => {
      const userForTest = getUserValidForTest();
      const result = await userRepository.addUser(userForTest);
      expect(
        await userRepository.findByEmail(userForTest.getEmail().getUserEmail()),
      ).toStrictEqual(userForTest);
    });
  });

  describe('AddUser', () => {
    it('Returns the user when adding a user', async () => {
      const userForTest = getUserValidForTest();
      expect(await userRepository.addUser(userForTest)).toStrictEqual(
        userForTest,
      );
    });
  });
});
