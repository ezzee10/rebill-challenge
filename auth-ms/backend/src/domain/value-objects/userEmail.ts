export class UserEmail {

    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    /*TODO: Se podrian generar muchas más validaciones pero prefiero acortarlo con una regex simple*/
    /* Tambien se podria investigar validaciones por parte del framework pero prefiero que el dominio 
        quede más nativo y no tan acomplado a librerias */
    isValid() {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(this.email);
    }

    getUserEmail() {
        return this.email;
    }

}