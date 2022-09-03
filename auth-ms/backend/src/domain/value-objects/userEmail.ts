export class UserEmail {

    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    isValid() {
        if (this.email.length > 0 && this.email.includes('@')) return true;
        return false;
    }

    getUserEmail() {
        return this.email;
    }

}