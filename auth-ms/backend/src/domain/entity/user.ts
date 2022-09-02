import { userPlainObjectInterface } from './userPlain.interface';
export class User {
  private email: string;

  static fromPlainObject(object: userPlainObjectInterface) {
    User.fromPlainObject(object);

    return new User(object.email);
  }

  static isValidObjectToCreateAnUserOrThrows(object: userPlainObjectInterface) {
    const { email } = object;

    if (email === '') {
      throw new Error('Email is invalid');
    }
  }

  constructor(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
