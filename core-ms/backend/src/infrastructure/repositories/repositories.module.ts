import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
