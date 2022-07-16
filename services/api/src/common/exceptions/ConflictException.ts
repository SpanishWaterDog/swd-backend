import { ApplicationException } from './ApplicationException';

export class ConflictException extends ApplicationException {
  public constructor(public message: string = 'Resource already exists') {
    super();
  }
}
