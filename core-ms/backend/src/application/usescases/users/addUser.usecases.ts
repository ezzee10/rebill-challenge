import { User } from '../../../domain/entity/user';
import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import { Document } from '../../../domain/value-objects/document';
import { UserEmail } from '../../../domain/value-objects/userEmail';

export class AddUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  static ERROR_ACCOUNT_EMAIL_MESSAGE = 'Account is already used';

  async execute(
    email: string,
    name: string,
    surname: string,
    document: { type: string; number: number },
  ): Promise<User> {
    /*TODO: IMPLEMENTAR LOGGER */
      const userInstance = User.fromPlainObject({
        email: UserEmail.createFrom(email),
        name,
        surname,
        document: Document.createFrom(document.type, document.number),
      });

      const foundUser = await this.userRepository.findByEmail(email);

      /**TODO: Implementar modelos de error */
      if (foundUser)
        throw new Error(AddUserUseCase.ERROR_ACCOUNT_EMAIL_MESSAGE);

      const newUser = await this.userRepository.addUser(userInstance);
      return newUser;
  }
}
