import { DynamicModule, Module } from '@nestjs/common';
import { LoginUserUseCase } from '../../application/usescases/auth/loginUser.usecase';
import { AddUserUseCase } from '../../application/usescases/users/addUser.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionService } from '../exceptions/exceptions.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [RepositoriesModule, ExceptionsModule, BcryptModule],
})
export class UseCasesProxyModule {
  static ADD_USER_USECASES_PROXY = 'addUserUsecaseProxy';
  static LOGIN_USER_USE_CASE_PROXY = 'loginUserUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository, ExceptionService, BcryptService],
          provide: UseCasesProxyModule.ADD_USER_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            exceptionService: ExceptionService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new AddUserUseCase(
                userRepository,
                exceptionService,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository, ExceptionService, BcryptService],
          provide: UseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            exceptionService: ExceptionService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUserUseCase(
                userRepository,
                exceptionService,
                bcryptService,
              ),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.ADD_USER_USECASES_PROXY,
        UseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
      ],
    };
  }
}
