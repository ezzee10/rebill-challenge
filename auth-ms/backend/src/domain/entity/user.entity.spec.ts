import { UserEmail } from '../value-objects/userEmail';
import { User } from './user';

describe('User class', () => {
  it('Given an email when i create the instance then i get said email', () => {
    const email = new UserEmail('test@test.com');
    const user: User = new User(email);
    expect(user).toBeInstanceOf(User);
    expect(user.getEmail()).toBe(email);
  });

  it('Given an empty email when i create the instance then it returns an error', () => {
    const userEmail = new UserEmail('');
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows({ userEmail }),
    ).toThrowError('Email is invalid');
  });

  it('Given an email that does not contain @ then returns an error', () => {
    const userEmail = new UserEmail('email');
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows({ userEmail }),
    ).toThrowError('Email is invalid');
  });

  it('Given an email that does not contain a dot then returns an error', () => {
    const userEmail = new UserEmail('email');
    expect(() =>
      User.isValidObjectToCreateAnUserOrThrows({ userEmail }),
    ).toThrowError('Email is invalid');
  });
});
