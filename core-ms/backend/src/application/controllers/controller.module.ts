import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [UsersController, AuthController],
})
export class ControllerModule {}
