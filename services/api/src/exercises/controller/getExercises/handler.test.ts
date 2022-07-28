import { clearDb } from '@common/controller-test/clearDb';
import { createExercise } from '@common/controller-test/entities/createExercise';
import getExercise from '@src/exercises/controller/getExercise/handler';
import { createRequest } from '@common/controller-test/createRequest';
import { context } from '@common/controller-test/lambdaContextMock';
import { Exercise } from '@prisma/client';
import getExercises from '@src/exercises/controller/getExercises/handler';

describe('exercises/controller/getExercises/handler.ts', () => {
  beforeEach(async () => {
    await clearDb();

    await createExercise('1', 'testExercise1', 'description', 's3-path');
    await createExercise('2', 'testExercise2', 'description', 's3-path');
  });

  it('should return all exercises', async () => {
    const result = await getExercises(createRequest(null, null, { id: 'test' }), context);

    const body = JSON.parse(result.body) as Exercise;
    console.log('body:', body);

    expect(result.statusCode).toBe(200);
  });
});
