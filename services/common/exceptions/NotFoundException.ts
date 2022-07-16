import { ApplicationException } from '@common/exceptions/ApplicationException';

export class NotFoundException extends ApplicationException {
  public constructor(public message: string = 'Resource not found or you have no access to it') {
    super();
  }
}
