import { UserEmail } from '../value-objects/userEmail';
import { UserPlainObjectInterface } from './userPlain.interface';
export class User {
  private email: UserEmail;

  static fromPlainObject(object: UserPlainObjectInterface) {
    this.isValidObjectToCreateAnUserOrThrows(object);
    return new User(object.userEmail);
  }

  static isValidObjectToCreateAnUserOrThrows(object: UserPlainObjectInterface) {
    const { userEmail } = object;

    if (!userEmail.isValid()) {
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
