import { User } from '../../../domain/entity/user';
import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import { Document } from '../../../domain/value-objects/document';
import { UserEmail } from '../../../domain/value-objects/userEmail';

export class AddUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    email: string,
    name: string,
    surname: string,
    document: { type: string; number: number },
  ): Promise<User> {
    const userInstance = User.fromPlainObject({
      email: UserEmail.createFrom(email),
      name,
      surname,
      document: Document.createFrom(document.type, document.number),
    });

    return await this.userRepository.addUser(userInstance);
  }
}
