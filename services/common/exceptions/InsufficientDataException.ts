import { ApplicationException } from '@common/exceptions/ApplicationException';

export class InsufficientDataException extends ApplicationException {
  public constructor(public message: string = 'Insufficient data') {
    super();
  }
}
