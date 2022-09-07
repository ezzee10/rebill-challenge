import {
    HttpException,
    HttpStatus
} from '@nestjs/common';

export class FunctionalException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT);
    }
}