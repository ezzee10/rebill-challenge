import { User } from '../../domain/entity/user';
import { IUserRepository } from '../../domain/repositories/userRepository.interface';
import { UserEmail } from '../../domain/value-objects/userEmail';
import { Document } from '../../domain/value-objects/document';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';

@Injectable()
export class DatabaseUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userEntityRepository: Repository<UserModel>,
  ) {}

  async addUser(user: User): Promise<User> {
    const userModel = this.toUserModel(user);

    /**TODO: IMPLEMENTAR LOGGER */
    try {
      const userModelResult = await this.userEntityRepository.save(userModel);
      return this.toUserEntity(userModelResult);
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const userModelResult = await this.userEntityRepository.findOne({
        where: { email: email },
      });
      if (userModelResult) return this.toUserEntity(userModelResult);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  private toUserModel(userEntity: User): UserModel {
    const userModel: UserModel = new UserModel();
    userModel.email = userEntity.getEmail().getUserEmail();
    userModel.name = userEntity.getName();
    userModel.surname = userEntity.getSurname();
    (userModel.documentType = userEntity.getDocument().getType()),
      (userModel.documentNumber = userEntity.getDocument().getNumber());

    return userModel;
  }

  private toUserEntity(userModel: UserModel): User {
    const userEntity: User = User.fromPlainObject({
      email: new UserEmail(userModel.email),
      name: userModel.name,
      surname: userModel.surname,
      document: Document.createFrom(
        userModel.documentType,
        userModel.documentNumber,
      ),
    });

    return userEntity;
  }
}
