import { User } from '../../../../src/domain/entity/user';
import { UserEmail } from '../../../../src/domain/value-objects/userEmail';
import { Document } from '../../../../src/domain/value-objects/document';
import { getUserValidForTest } from '../fakeForTest/userForTest';

describe('User class', () => {
  const getObjectValid = () => {
    return {
      email: UserEmail.createFrom('test@test.com'),
      password: '1234567a@',
      name: 'Ezequiel',
      surname: 'Colombano',
      document: Document.createFrom('DNI', 38998408),
    };
  };

  it('Given an email when i create the instance then i get said email', () => {
    const email = 'test@test.com';
    const objectForTest = getObjectValid();
    const user: User = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getEmail().getUserEmail()).toBe(email);
  });

  it('Given an name valid when i create the instance then i get said name ', () => {
    const name = 'Ezequiel';
    const objectForTest = getObjectValid();
    objectForTest.name = name;
    const user = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(name);
  });

  it('Given an empty name when creating an instance then error is returned', () => {
    const name = '';
    const objectForTest = getObjectValid();
    objectForTest.name = name;
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows(objectForTest),
    ).toThrowError(User.ERROR_NAME_IS_INVALID);
  });

  it('Given an surname valid when i create the instance then i get said surname', () => {
    const surname = 'Colombano';
    const objectForTest = getObjectValid();
    objectForTest.surname = surname;
    const user = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getSurname()).toBe(surname);
  });

  it('Given an empty surname when creating an instance then error is returned', () => {
    const surname = '';
    const objectForTest = getObjectValid();
    objectForTest.surname = surname;
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows(objectForTest),
    ).toThrowError(User.ERROR_SURNAME_IS_INVALID);
  });

  it('Given a valid document type and number when creating then i can get them', () => {
    const documentType = 'DNI';
    const documentNumber = 38998408;
    const objectForTest = getObjectValid();
    const user = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getDocument().getNumber()).toBe(documentNumber);
    expect(user.getDocument().getType()).toBe(documentType);
  });
});
