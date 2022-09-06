import { DynamicModule, Module } from '@nestjs/common';
import { AddUserUseCase } from '../../application/usescases/users/addUser.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static ADD_USER_USECASES_PROXY = 'addUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.ADD_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new AddUserUseCase(userRepository)),
        },
      ],
      exports: [UseCasesProxyModule.ADD_USER_USECASES_PROXY],
    };
  }
}
