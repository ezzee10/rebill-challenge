import { UserEmail } from '../../../../src/domain/value-objects/userEmail';

describe('Document class', () => {
  it('Given an empty email when i create the instance then it returns an error', () => {
    expect(() => UserEmail.createFrom('')).toThrowError(
      UserEmail.USER_EMAIL_ERROR_MESSAGE,
    );
  });

  it('Given an email that does not contain @ then returns an error', () => {
    expect(() => UserEmail.createFrom('test')).toThrowError(
      UserEmail.USER_EMAIL_ERROR_MESSAGE,
    );
  });

  it('Given an email that does not contain a dot then returns an error', () => {
    expect(() => UserEmail.createFrom('test@')).toThrowError(
      UserEmail.USER_EMAIL_ERROR_MESSAGE,
    );
  });
});
