export class User {

    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }
}