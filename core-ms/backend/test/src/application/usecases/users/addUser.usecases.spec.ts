import { AddUserUseCase } from '../../../../../src/application/usescases/users/addUser.usecases';
import { DatabaseUserRepository } from '../../../../../src/infrastructure/repositories/user.repository';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModel } from '../../../../../src/infrastructure/models/user.model';
import { getUserValidForTest } from '../../../domain/fakeForTest/userForTest';
import { Repository } from 'typeorm';
import { getUserModelValidForTest } from '../../../domain/fakeForTest/userModelForTest';
import { ExceptionService } from '../../../../../src/infrastructure/exceptions/exceptions.service';

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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DatabaseUserRepository,
        AddUserUseCase,
        ExceptionService,
        {
          provide: getRepositoryToken(UserModel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<DatabaseUserRepository>(
      DatabaseUserRepository,
    );
    userRepositoryMock = moduleRef.get(getRepositoryToken(UserModel));

    addUserUseCase = new AddUserUseCase(userRepository, new ExceptionService());
  });

  it('Return new instance when adding a user whose email is not found', async () => {
    const user = getUserValidForTest();
    const userModel = getUserModelValidForTest();

    userRepositoryMock.findOne.mockReturnValue(null);
    userRepositoryMock.save.mockReturnValue(userModel);

    expect(
      await addUserUseCase.execute(
        user.getEmail().getUserEmail(),
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
    const user = getUserValidForTest();
    const userModel = getUserModelValidForTest();

    // Returns user found by mock
    userRepositoryMock.findOne.mockReturnValue(userModel);
    userRepositoryMock.save.mockReturnValue(userModel);

    expect(
        addUserUseCase.execute(
          user.getEmail().getUserEmail(),
          user.getName(),
          user.getSurname(),
          {
            type: user.getDocument().getType(),
            number: user.getDocument().getNumber(),
          },
        )).rejects.toThrow(AddUserUseCase.ERROR_ACCOUNT_EMAIL_MESSAGE);
  });
});
