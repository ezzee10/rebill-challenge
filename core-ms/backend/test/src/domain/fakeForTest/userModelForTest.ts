import { UserModel } from '../../../../src/infrastructure/models/user.model';

export const getUserModelValidForTest = (): UserModel => {
  const userModel = new UserModel();

  userModel.email = 'test@test.com';
  (userModel.name = 'NombreTest'),
    (userModel.surname = 'ApellidoTest'),
    (userModel.documentType = 'DNI'),
    (userModel.documentNumber = 30303030);

  return userModel;
};
