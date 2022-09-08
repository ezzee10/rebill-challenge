import { UserEmail } from '../value-objects/userEmail';
import { UserPlainObjectInterface } from './userPlain.interface';
import { Document } from '../value-objects/document';
export class User {
  private email: UserEmail;
  private name: string;
  private surname: string;
  private document: Document;
  private password: string;

  static fromPlainObject(object: UserPlainObjectInterface) {
    this.isValidObjectToCreateAnUserOrThrows(object);
    return new User(
      object.email,
      object.password,
      object.name,
      object.surname,
      object.document,
    );
  }

  static isValidObjectToCreateAnUserOrThrows(object: UserPlainObjectInterface) {
    const { name, surname } = object;

    if (name.length <= 0) throw new Error(User.ERROR_NAME_IS_INVALID);

    if (surname.length <= 0) throw new Error(User.ERROR_SURNAME_IS_INVALID);
  }

  // TODO: Aplicar algun patron de construcción como Builder
  constructor(
    email: UserEmail,
    password: string,
    name: string,
    surname: string,
    document: Document,
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.document = document;
  }

  getDocument(): Document {
    return this.document;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): UserEmail {
    return this.email;
  }

  getSurname(): string {
    return this.surname;
  }

  static ERROR_NAME_IS_INVALID = 'Name is invalid';
  static ERROR_SURNAME_IS_INVALID = 'Surname is invalid';
}
