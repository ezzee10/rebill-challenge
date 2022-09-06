import { User } from '../../domain/entity/user';
import { IUserRepository } from '../../domain/repositories/userRepository.interface';

export class DatabaseUserRepository implements IUserRepository {
  async addUser(userEntity: User) {
    return new Promise<User>((resolve, reject) => {
      resolve(userEntity);
    });
  }
}
