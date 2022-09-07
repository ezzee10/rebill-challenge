import { Module } from '@nestjs/common';
import { ControllerModule } from './application/controllers/controller.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/models/user.model';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
@Module({
  imports: [
    /** TODO: Mover a un modulo aparte */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'users',
      schema: 'public',
      entities: [UserModel],
      synchronize: true,
    }),
    ControllerModule,
    UseCasesProxyModule.register(),
    ExceptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
