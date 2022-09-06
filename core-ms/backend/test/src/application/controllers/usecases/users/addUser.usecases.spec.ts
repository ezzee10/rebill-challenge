import { Document } from '../../../../../../src/domain/value-objects/document';
import { UserEmail } from '../../../../../../src/domain/value-objects/userEmail';
import { AddUserUseCase } from '../../../../../../src/application/usescases/users/addUser.usecases';
import { User } from '../../../../../../src/domain/entity/user';
import { DatabaseUserRepository } from '../../../../../../src/infrastructure/repositories/user.repository';

describe('AddUserUseCase', () => {
  let userRepository: DatabaseUserRepository;
  let addUserUseCase: AddUserUseCase;

  beforeEach(() => {
    userRepository = new DatabaseUserRepository();
    addUserUseCase = new AddUserUseCase(userRepository);
  });

  describe('Execute', () => {
    it('Return a new user instance', async () => {
      const userCreatedFakeInstance = User.fromPlainObject({
        email: UserEmail.createFrom('test@test.com'),
        name: 'Test',
        surname: 'Test',
        document: Document.createFrom('DNI', 38778788),
      });

      expect(
        await addUserUseCase.execute('test@test.com', 'Test', 'Test', {
          type: 'DNI',
          number: 38778788,
        }),
      ).toStrictEqual(userCreatedFakeInstance);
    });
  });
});
