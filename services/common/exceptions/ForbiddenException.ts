import { ApplicationException } from '@common/exceptions/ApplicationException';

export class ForbiddenException extends ApplicationException {
  public constructor(public message: string = 'User has no access to resource') {
    super();
  }
}
