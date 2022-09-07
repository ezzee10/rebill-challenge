import { User } from '../entity/user';

export interface IUserRepository {
  addUser(userEntity: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
