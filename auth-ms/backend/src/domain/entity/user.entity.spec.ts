import { UserEmail } from '../value-objects/userEmail';
import { User } from './user';

describe('User class', () => {
  const getObjectValid = () => {
    return {
      email: new UserEmail('test@test.com'),
      name: 'Ezequiel',
    };
  };

  it('Given an email when i create the instance then i get said email', () => {
    const email = new UserEmail('test@test.com');
    const objectForTest = getObjectValid();
    objectForTest.email = email;
    const user: User = User.fromPlainObject(objectForTest);
    expect(user).toBeInstanceOf(User);
    expect(user.getEmail()).toBe(email.getUserEmail());
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

  it('Given an name valid when i create the instance then i get said email ', () => {
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
});
