import { Module } from '@nestjs/common';
import { ControllerModule } from './application/controllers/controller.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
@Module({
  imports: [ControllerModule, UseCasesProxyModule.register()],
  controllers: [],
  providers: [],
})
export class AppModule {}
