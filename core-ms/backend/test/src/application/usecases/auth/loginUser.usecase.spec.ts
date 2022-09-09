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
import { LoginUserUseCase } from '../../../../../src/application/usescases/auth/loginUser.usecase';
import { LoginResponse } from 'src/domain/interfaces/auth/loginResponse.interface';

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

describe('LoginUserCase', () => {
  let userRepository: DatabaseUserRepository;
  let loginUserCase: LoginUserUseCase;
  let userRepositoryMock: MockType<Repository<UserModel>>;
  let bcryptService: BcryptService;

  const user = getUserValidForTest();
  const userModel = getUserModelValidForTest();

  let bcryptMock = {
    hash: () => user.getPassword(),
    compare: () => true,
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

    loginUserCase = new LoginUserUseCase(
      userRepository,
      new ExceptionService(),
      bcryptService,
    );
  });

  it('Given a user that is registered when passing username and password I get a token', async () => {

    const email = user.getEmail().getUserEmail();
    const password = user.getPassword();

    userRepositoryMock.findOne.mockReturnValue(userModel);

    const loginResponse: LoginResponse = {
        email,
        accessToken: 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        expiresIn: '3600'
    }

    expect(
      await loginUserCase.execute(
        email,
        password
      ),
    ).toStrictEqual(loginResponse);
  });

  it('Given a user that is not registered then return error', async () => {
    userRepositoryMock.findOne.mockReturnValue(null);

    expect(
        loginUserCase.execute(
        user.getEmail().getUserEmail(),
        user.getPassword(),
      ),
    ).rejects.toThrow(LoginUserUseCase.ERROR_INVALID_CREDENTIALS);
  });

  it('Given a user that is registered but with an incorrect password, it returns an error', async () => {
    userRepositoryMock.findOne.mockReturnValue(userModel);

    bcryptMock.compare = () => false;

    expect(
        loginUserCase.execute(
        user.getEmail().getUserEmail(),
        'incorrectPassword',
      ),
    ).rejects.toThrow(LoginUserUseCase.ERROR_INVALID_CREDENTIALS);
  });
});