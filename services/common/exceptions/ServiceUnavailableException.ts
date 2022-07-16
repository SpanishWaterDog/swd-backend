import { ApplicationException } from '@common/exceptions/ApplicationException';

export class ServiceUnavailableException extends ApplicationException {
  public constructor(public message: string = 'Service Unavailable') {
    super();
  }
}
