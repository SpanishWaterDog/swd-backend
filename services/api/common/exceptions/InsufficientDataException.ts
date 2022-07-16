import { ApplicationException } from './ApplicationException';

export class InsufficientDataException extends ApplicationException {
  public constructor(public message: string = 'Insufficient data') {
    super();
  }
}
