import { Exercise, PrismaClient } from '@prisma/client';

export async function createExercise(id: string, name: string, description: string, s3Path: string): Promise<Exercise> {
  const prisma = new PrismaClient();
  const exercise: Exercise = {
    id,
    name,
    description,
    s3Path,
  };
  return await prisma.exercise.create({
    data: exercise,
  });
}
