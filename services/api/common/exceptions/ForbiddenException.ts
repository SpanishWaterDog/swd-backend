import { ApplicationException } from './ApplicationException';

export class ForbiddenException extends ApplicationException {
  public constructor(public message: string = 'User has no access to resource') {
    super();
  }
}
