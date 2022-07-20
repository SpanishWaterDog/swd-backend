import { prismaClient } from '@src/exercises/controller/getExercise/handler';
import { GetExerciseRequest } from '@src/exercises/application/getExercise/request';
import ExerciseService from '@src/exercises/repository/exercise.service';
import { Exercise } from '@prisma/client';

export async function getExerciseAction(event: GetExerciseRequest): Promise<Exercise | null> {
  return await ExerciseService.getExerciseById(event.exerciseId, prismaClient);
}
