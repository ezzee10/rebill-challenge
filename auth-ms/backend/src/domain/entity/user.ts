import { UserEmail } from '../value-objects/userEmail';
import { UserPlainObjectInterface } from './userPlain.interface';
export class User {
  private email: UserEmail;
  private name: string;

  static fromPlainObject(object: UserPlainObjectInterface) {
    this.isValidObjectToCreateAnUserOrThrows(object);
    return new User(object.email, object.name);
  }

  static isValidObjectToCreateAnUserOrThrows(object: UserPlainObjectInterface) {
    const { email, name } = object;

    if (!email.isValid()) throw new Error('Email is invalid');

    if (name.length <= 0) throw new Error('Name is invalid');
  }

  constructor(email: UserEmail, name: string) {
    this.email = email;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getUserEmail();
  }
}
