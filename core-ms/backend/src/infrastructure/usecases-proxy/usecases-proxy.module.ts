import { DynamicModule, Module } from '@nestjs/common';
import { AddUserUseCase } from '../../application/usescases/users/addUser.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionService } from '../exceptions/exceptions.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [RepositoriesModule, ExceptionsModule],
})
export class UseCasesProxyModule {
  static ADD_USER_USECASES_PROXY = 'addUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository, ExceptionService],
          provide: UseCasesProxyModule.ADD_USER_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository, 
            exceptionService: ExceptionService
          ) => new UseCaseProxy(new AddUserUseCase(userRepository, exceptionService)),
        },
      ],
      exports: [UseCasesProxyModule.ADD_USER_USECASES_PROXY],
    };
  }
}