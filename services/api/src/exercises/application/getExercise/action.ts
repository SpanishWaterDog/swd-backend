import { prismaClient } from '@src/exercises/controller/getExercise/handler';
import { GetExerciseRequest } from '@src/exercises/application/getExercise/request';
import ExerciseService from '@src/exercises/repository/exercise.service';
import { Exercise } from '@prisma/client';
import { NotFoundException } from '@common/exceptions/NotFoundException';

export async function getExerciseAction(event: GetExerciseRequest): Promise<Exercise | null> {
  const exercise = await ExerciseService.getExerciseById(event.exerciseId, prismaClient);

  if (!exercise) {
    throw new NotFoundException(`Exercise ${event.exerciseId} not found`);
  }

  return exercise;
}
