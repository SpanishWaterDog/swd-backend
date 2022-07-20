import { APIGatewayProxyResult } from 'aws-lambda';
import api from '@common/controller/api';
import { ApiEvent } from '@common/controller/ApiEvent';
import { GetExerciseRequest } from '@src/exercises/application/getExercise/request';
import { getExerciseAction } from '@src/exercises/application/getExercise/action';
import { response } from '@common/controller/response';
import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

const getExercise = api(async (event: ApiEvent): Promise<APIGatewayProxyResult> => {
  const params: GetExerciseRequest = {
    token: event.data.token,
    exerciseId: event.data.getPathParam('id'),
  };

  const exercise = await getExerciseAction(params);
  return response(200, exercise);
});

export default getExercise;
