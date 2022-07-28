import { PrismaClient } from '@prisma/client';
import { ApiEvent } from '@common/controller/ApiEvent';
import { APIGatewayProxyResult } from 'aws-lambda';
import api from '@common/controller/api';
import { GetExercisesRequest } from '@src/exercises/application/getExercises/request';
import { getExercisesAction } from '@src/exercises/application/getExercises/action';
import { response } from '@common/controller/response';

export const prismaClient = new PrismaClient();

const getExercises = api(async (event: ApiEvent): Promise<APIGatewayProxyResult> => {
  const params: GetExercisesRequest = {
    token: event.data.token,
  };

  const exercises = await getExercisesAction(params);
  return response(200, exercises);
});

export default getExercises;
