import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [UsersController],
})
export class ControllerModule {}
