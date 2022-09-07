import * as request from 'supertest';
import { DatabaseUserRepository } from '../../../../../src/infrastructure/repositories/user.repository';
import { UserEmail } from '../../../../../src/domain/value-objects/userEmail';
import { Document } from '../../../../../src/domain/value-objects/document';
import { User } from '../../../../../src/domain/entity/user';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';

describe('UsersController', () => {
  const userCreatedFakeInstance = User.fromPlainObject({
    email: UserEmail.createFrom('test@test.com'),
    name: 'Test',
    surname: 'Test',
    document: Document.createFrom('DNI', 38778788),
  });

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
    await app.init();
  });

  describe('POST /users/signup', () => {

    const userCreatedFakeResponse = {
      email: 'test@test.com',
      name: 'Test',
      surname: 'Test',
      document: {
        type: 'DNI',
        number: 38778788,
      },
    };

    const userFakeBody = {
      name: 'Test',
      surname: 'Test',
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
  });

  afterAll(async () => {
    await app.close();
  });
});
