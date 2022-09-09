import { IException } from '../../../src/domain/exceptions/exceptions.interface';
import { FunctionalException, BadRequestException, UnauthorizedException } from './exceptions';

export class ExceptionService implements IException {
  functionalException(message: string): void {
    throw new FunctionalException(message);
  }

  badRequestException(message: string): void {
    throw new BadRequestException(message);
  }

  unauthorizedException(message: string): void {
    throw new UnauthorizedException(message);
  }
}
