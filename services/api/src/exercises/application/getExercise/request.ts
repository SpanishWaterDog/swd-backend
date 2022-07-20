import { BaseRequest } from '@common/application/BaseRequest';

export interface GetExerciseRequest extends BaseRequest {
  exerciseId: string;
}
