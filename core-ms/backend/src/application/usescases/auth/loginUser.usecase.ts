import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import { ExceptionService } from 'src/infrastructure/exceptions/exceptions.service';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { LoginResponse } from 'src/domain/interfaces/auth/loginResponse.interface';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly bcryptService: IBcryptService,
  ) { }

  //TODO: Crear una clase que mapee estos errores
  static ERROR_INVALID_CREDENTIALS = 'Email or password is invalid';

  async execute(email: string, password: string): Promise<LoginResponse> {

    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser)
      this.exceptionService.unauthorizedException(
        LoginUserUseCase.ERROR_INVALID_CREDENTIALS,
      );

    const passwordHashed = foundUser.getPassword();
    const isValidPassword = await this.bcryptService.compare(
      password,
      passwordHashed,
    );

    if (!isValidPassword)
      this.exceptionService.unauthorizedException(
        LoginUserUseCase.ERROR_INVALID_CREDENTIALS,
      );

    // TODO: Servicio que genera el token
    const token = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const expiresIn = '3600';

    const loginResponse = {
      email: foundUser.getEmail().getUserEmail(),
      accessToken: token,
      expiresIn: expiresIn,
    };

    return loginResponse;

  }
}
