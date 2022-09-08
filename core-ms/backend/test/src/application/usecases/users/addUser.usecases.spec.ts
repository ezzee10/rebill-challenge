import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AddUserUseCase } from '../../../../../src/application/usescases/users/addUser.usecases';
import { DatabaseUserRepository } from '../../../../../src/infrastructure/repositories/user.repository';
import { UserModel } from '../../../../../src/infrastructure/models/user.model';
import { getUserValidForTest } from '../../../domain/fakeForTest/userForTest';
import { getUserModelValidForTest } from '../../../domain/fakeForTest/userModelForTest';
import { ExceptionService } from '../../../../../src/infrastructure/exceptions/exceptions.service';
import { BcryptService } from '../../../../../src/infrastructure/services/bcrypt/bcrypt.service';
import { BcryptModule } from '../../../../../src/infrastructure/services/bcrypt/bcrypt.module';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
  }),
);

describe('AddUserUseCase', () => {
  let userRepository: DatabaseUserRepository;
  let addUserUseCase: AddUserUseCase;
  let userRepositoryMock: MockType<Repository<UserModel>>;
  let bcryptService: BcryptService;

  const user = getUserValidForTest();
  const userModel = getUserModelValidForTest();

  const bcryptMock = {
    hash: () => user.getPassword(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BcryptModule],
      providers: [
        DatabaseUserRepository,
        AddUserUseCase,
        ExceptionService,
        BcryptService,
        {
          provide: getRepositoryToken(UserModel),
          useFactory: repositoryMockFactory,
        },
      ],
    })
      .overrideProvider(BcryptService)
      .useValue(bcryptMock)
      .compile();

    userRepository = moduleRef.get<DatabaseUserRepository>(
      DatabaseUserRepository,
    );
    userRepositoryMock = moduleRef.get(getRepositoryToken(UserModel));
    bcryptService = moduleRef.get<BcryptService>(BcryptService);

    addUserUseCase = new AddUserUseCase(
      userRepository,
      new ExceptionService(),
      bcryptService,
    );
  });

  it('Return new instance when adding a user whose email is not found', async () => {
    userRepositoryMock.findOne.mockReturnValue(null);
    userRepositoryMock.save.mockReturnValue(userModel);

    expect(
      await addUserUseCase.execute(
        user.getEmail().getUserEmail(),
        user.getPassword(),
        user.getName(),
        user.getSurname(),
        {
          type: user.getDocument().getType(),
          number: user.getDocument().getNumber(),
        },
      ),
    ).toStrictEqual(user);
  });

  it('Return error if the error is already used', async () => {
    // Returns user found by mock
    userRepositoryMock.findOne.mockReturnValue(userModel);
    userRepositoryMock.save.mockReturnValue(userModel);

    expect(
      addUserUseCase.execute(
        user.getEmail().getUserEmail(),
        user.getPassword(),
        user.getName(),
        user.getSurname(),
        {
          type: user.getDocument().getType(),
          number: user.getDocument().getNumber(),
        },
      ),
    ).rejects.toThrow(AddUserUseCase.ERROR_ACCOUNT_EMAIL_MESSAGE);
  });
});
