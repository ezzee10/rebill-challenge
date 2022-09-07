import { IException } from '../../../src/domain/exceptions/exceptions.interface';
import { FunctionalException } from './exceptions';

export class ExceptionService implements IException {
    functionalException(message: string): void {
        // throw new NotFoundException(data);
        throw new FunctionalException(message)
    }

}


