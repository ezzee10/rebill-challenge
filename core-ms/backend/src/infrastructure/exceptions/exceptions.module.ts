import { Module } from '@nestjs/common';
import { ExceptionService } from './exceptions.service';

@Module({
    providers: [ExceptionService],
    exports: [ExceptionService]
})

export class ExceptionsModule{}