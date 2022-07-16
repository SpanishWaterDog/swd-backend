import { ApplicationException } from '@common/exceptions/ApplicationException';

export class BadRequestException extends ApplicationException {
  public constructor(public message: string = 'Invalid input') {
    super();
  }
}
