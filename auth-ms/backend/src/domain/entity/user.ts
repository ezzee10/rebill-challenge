import { UserEmail } from '../value-objects/userEmail';
import { UserPlainObjectInterface } from './userPlain.interface';
import { Document } from '../value-objects/document';
export class User {
  private email: UserEmail;
  private name: string;
  private surname: string;
  private document: Document;

  static fromPlainObject(object: UserPlainObjectInterface) {
    this.isValidObjectToCreateAnUserOrThrows(object);
    return new User(object.email, object.name, object.surname, object.document);
  }

  static isValidObjectToCreateAnUserOrThrows(object: UserPlainObjectInterface) {
    const { email, name, surname } = object;

    if (!email.isValid()) throw new Error('Email is invalid');

    if (name.length <= 0) throw new Error('Name is invalid');

    if (surname.length <= 0) throw new Error('Surname is invalid');
  }

  constructor(
    email: UserEmail,
    name: string,
    surname: string,
    document: Document,
  ) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.document = document;
  }

  getDocument(): Document {
    return this.document;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getUserEmail();
  }

  getSurname(): string {
    return this.surname;
  }
}
