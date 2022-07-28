import {GetExercisesRequest} from "@src/exercises/application/getExercises/request";
import {Exercise} from "@prisma/client";
import ExerciseService from "@src/exercises/repository/exercise.service";
import {prismaClient} from "@src/exercises/controller/getExercises/handler";

export async function getExercisesAction(event: GetExercisesRequest): Promise<Exercise[]> {
  return await ExerciseService.getAllExercises(prismaClient);
}