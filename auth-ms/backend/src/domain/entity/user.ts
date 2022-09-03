import { UserEmail } from '../value-objects/userEmail';
import { userPlainObjectInterface } from './userPlain.interface';
export class User {
  private email: UserEmail;

  static fromPlainObject(email: UserEmail) {
    this.isValidObjectToCreateAnUserOrThrows(email);
    return new User(email);
  }

  static isValidObjectToCreateAnUserOrThrows(email: UserEmail) {
    if (!(email.isValid())) {
      throw new Error('Email is invalid');
    }
  }

  constructor(email: UserEmail) {
    this.email = email;
  }

  getEmail(): UserEmail {
    return this.email;
  }
}
