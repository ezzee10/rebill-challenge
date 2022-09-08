import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseUserRepository } from '../../../../../src/infrastructure/repositories/user.repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';
import { getUserValidForTest } from '../../../../../test/src/domain/fakeForTest/userForTest';
import { errorMessages } from '../../../../../src/domain/exceptions/error.messages';

describe('UsersController', () => {
  const userCreatedFakeInstance = getUserValidForTest();

  let app: INestApplication;
  const userRepository = {
    addUser: () => userCreatedFakeInstance,
    findByEmail: () => null,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseUserRepository)
      .useValue(userRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST /users/signup', () => {
    const userCreatedFakeResponse = {
      email: 'test@test.com',
      name: 'NombreTest',
      surname: 'ApellidoTest',
      document: {
        type: 'DNI',
        number: 30303030,
      },
    };

    const userFakeBody = {
      name: 'NombreTest',
      password: 'password123!',
      surname: 'ApellidoTest',
      email: 'test@test.com',
      document: {
        type: 'DNI',
        number: 30303030,
      },
    };

    it('should return the created user and status code 201', async () => {
      return request(app.getHttpServer())
        .post('/users/signup')
        .send(userFakeBody)
        .expect(201)
        .expect(userCreatedFakeResponse);
    });

    it('should return the error if the password is less than 8 characters', async () => {
      const userFakeBodyPasswordIncorrect = userFakeBody;
      userFakeBodyPasswordIncorrect.password = 'abcd';

      const res = await request(app.getHttpServer())
        .post('/users/signup')
        .send(userFakeBodyPasswordIncorrect);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Bad Request');
      expect(res.body).toHaveProperty('message', [
        errorMessages.invalidPassword,
      ]);
    });

    it('should return the error if the password does not contain at least one number', async () => {
      const userFakeBodyPasswordIncorrect = userFakeBody;
      userFakeBodyPasswordIncorrect.password = 'abcdefgh';

      const res = await request(app.getHttpServer())
        .post('/users/signup')
        .send(userFakeBodyPasswordIncorrect);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Bad Request');
      expect(res.body).toHaveProperty('message', [
        errorMessages.invalidPassword,
      ]);
    });

    it('should return the error if the password does not contain at least one special character', async () => {
      const userFakeBodyPasswordIncorrect = userFakeBody;
      userFakeBodyPasswordIncorrect.password = 'abcdefgh11';

      const res = await request(app.getHttpServer())
        .post('/users/signup')
        .send(userFakeBodyPasswordIncorrect);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Bad Request');
      expect(res.body).toHaveProperty('message', [
        errorMessages.invalidPassword,
      ]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
