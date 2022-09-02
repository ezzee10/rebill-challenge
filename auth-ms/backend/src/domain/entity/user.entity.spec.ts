import { User } from "./user";

describe('User class', () => { 

    it('Given an email when i create the instance then i get said email', () => {
        const email = 'test@test.com';
        const user: User = new User(email);
        expect(user).toBeInstanceOf(User);
        expect(user.getEmail()).toBe(email);
    });

})