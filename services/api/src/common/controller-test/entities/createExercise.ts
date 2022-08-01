import { Exercise, PrismaClient } from '@prisma/client';

export async function createExercise(id: string, name: string, description: string): Promise<Exercise> {
  const prisma = new PrismaClient();
  const exercise: Exercise = {
    id,
    name,
    description,
  };
  return await prisma.exercise.create({
    data: exercise,
  });
}
