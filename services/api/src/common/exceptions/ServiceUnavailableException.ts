import { ApplicationException } from './ApplicationException';

export class ServiceUnavailableException extends ApplicationException {
  public constructor(public message: string = 'Service Unavailable') {
    super();
  }
}
