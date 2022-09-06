import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './user.repository';

@Module({
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
