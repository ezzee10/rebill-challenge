import { User } from './user';
import { UserEmail } from '../value-objects/userEmail';
import { Document } from '../value-objects/document';

describe('User class', () => {
  const getObjectValid = () => {
    return {
      email: new UserEmail('test@test.com'),
      name: 'Ezequiel',
      surname: 'Colombano',
      document: new Document('DNI', 38998408),
    };
  };

  it('Given an email when i create the instance then i get said email', () => {
    const email = 'test@test.com';
    const objectForTest = getObjectValid();
    const user: User = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getEmail().getUserEmail()).toBe(email);
  });

  it('Given an empty email when i create the instance then it returns an error', () => {
    const userEmail = new UserEmail('');
    const objectForTest = getObjectValid();
    objectForTest.email = userEmail;
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows(objectForTest),
    ).toThrowError('Email is invalid');
  });

  it('Given an email that does not contain @ then returns an error', () => {
    const userEmail = new UserEmail('email');
    const objectForTest = getObjectValid();
    objectForTest.email = userEmail;
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows(objectForTest),
    ).toThrowError('Email is invalid');
  });

  it('Given an email that does not contain a dot then returns an error', () => {
    const userEmail = new UserEmail('email');
    const objectForTest = getObjectValid();
    objectForTest.email = userEmail;
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows(objectForTest),
    ).toThrowError('Email is invalid');
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
    ).toThrowError('Name is invalid');
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
    ).toThrowError('Surname is invalid');
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
