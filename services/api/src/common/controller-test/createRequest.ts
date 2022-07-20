import { ApiEvent } from '@common/controller/ApiEvent';
import * as TypeMoq from 'typemoq';

export function createRequest(
  userId?: string | null,
  body?: unknown | null,
  pathParameters?: { [name: string]: string } | null,
  queryStringParameters?: { [name: string]: string },
  headers?: { [name: string]: string }
): ApiEvent {
  let requestParameters: ApiEvent = TypeMoq.Mock.ofType<ApiEvent>().object;

  requestParameters = {
    ...requestParameters,
    requestContext: {
      ...requestParameters.requestContext,
      authorizer: {
        claims: {
          'custom:userId': userId,
        },
      },
    },
  };

  if (pathParameters) {
    requestParameters = { ...requestParameters, pathParameters };
  }
  if (queryStringParameters) {
    requestParameters = { ...requestParameters, queryStringParameters };
  }
  if (body) {
    requestParameters = { ...requestParameters, body: JSON.stringify(body) };
  }
  requestParameters = { ...requestParameters, headers: { 'endpoint-version': 'latest', ...headers } };

  return requestParameters;
}
