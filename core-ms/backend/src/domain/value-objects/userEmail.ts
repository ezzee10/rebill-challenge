export class UserEmail {
  private email: string;
  //TODO: MODELAR RESPUESTAS DE ERROR
  static USER_EMAIL_ERROR_MESSAGE = 'Email is invalid';

  constructor(email: string) {
    this.email = email;
  }

  static createFrom(email: string) {
    this.isValidToCreateEmailOrThrows(email);
    return new UserEmail(email);
  }

  static isValidToCreateEmailOrThrows(email: string) {
    if (!this.isValid(email))
      throw new Error(UserEmail.USER_EMAIL_ERROR_MESSAGE);
  }

  /*TODO: Se podrian generar muchas más validaciones pero prefiero acortarlo con una regex simple*/
  /* Tambien se podria investigar validaciones por parte del framework pero prefiero que el dominio 
        quede más nativo y no tan acomplado a librerias */
  static isValid(email: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  getUserEmail() {
    return this.email;
  }
}
