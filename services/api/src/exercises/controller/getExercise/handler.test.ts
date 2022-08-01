import { createRequest } from '@common/controller-test/createRequest';
import getExercise from '@src/exercises/controller/getExercise/handler';
import { clearDb } from '@common/controller-test/clearDb';
import { createExercise } from '@common/controller-test/entities/createExercise';
import { Exercise } from '@prisma/client';
import { context } from '@common/controller-test/lambdaContextMock';

describe('exercises/controller/getExercise/handler.ts', () => {
  beforeEach(async () => {
    await clearDb();
  });

  it('should return status 200', async () => {
    const exercise = await createExercise('test', 'testExercise', 'description');
    const result = await getExercise(createRequest(null, null, { id: 'test' }), context);
    const body = JSON.parse(result.body) as Exercise;
    expect(result.statusCode).toBe(200);
    expect(body.id).toBe(exercise.id);
  });

  it('should return status 404 if exercise does not exist', async () => {
    const result = await getExercise(createRequest(null, null, { id: 'not-existing-exercise' }), context);
    expect(result.statusCode).toBe(404);
  });
});
