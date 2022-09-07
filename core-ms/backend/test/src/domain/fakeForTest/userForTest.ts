import { User } from '../../../../src/domain/entity/user';
import { Document } from '../../../../src/domain/value-objects/document';
import { UserEmail } from '../../../../src/domain/value-objects/userEmail';

export const getUserValidForTest = (): User => {
  return User.fromPlainObject({
    email: UserEmail.createFrom('test@test.com'),
    name: 'NombreTest',
    surname: 'ApellidoTest',
    document: Document.createFrom('DNI', 30303030),
  });
};
