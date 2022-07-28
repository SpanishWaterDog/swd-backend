import { PrismaClient, Exercise } from '@prisma/client';

export default class ExerciseService {
  static async getExerciseById(id: string, prisma: PrismaClient): Promise<Exercise | null> {
    return await prisma.exercise.findUnique({
      where: {
        id,
      },
    });
  }

  static async getAllExercises(prisma: PrismaClient): Promise<Exercise[]> {
    return await prisma.exercise.findMany();
  }
}
