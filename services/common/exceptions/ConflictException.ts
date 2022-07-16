import { ApplicationException } from '@common/exceptions/ApplicationException';

export class ConflictException extends ApplicationException {
  public constructor(public message: string = 'Resource already exists') {
    super();
  }
}
