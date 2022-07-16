import { ApplicationException } from '@common/exceptions/ApplicationException';

export class NotAcceptableException extends ApplicationException {
  public constructor(public message: string = 'User has sent request that cannot be processed') {
    super();
  }
}
