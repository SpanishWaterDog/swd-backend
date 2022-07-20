// import Config from '@common/Config';
import { errorResponse, response, unhandledErrorResponse } from '@common/controller/response';
import { ApplicationException } from '@common/exceptions/ApplicationException';
import { BadRequestException } from '@common/exceptions/BadRequestException';
import { ConflictException } from '@common/exceptions/ConflictException';
import { ForbiddenException } from '@common/exceptions/ForbiddenException';
import { NotAcceptableException } from '@common/exceptions/NotAcceptableException';
import { NotFoundException } from '@common/exceptions/NotFoundException';
import { ServiceUnavailableException } from '@common/exceptions/ServiceUnavailableException';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda/common/api-gateway';
import { APIGatewayProxyCognitoAuthorizer, APIGatewayProxyEventHeaders, APIGatewayProxyEventMultiValueHeaders } from 'aws-lambda/trigger/api-gateway-proxy';

import { ApiEvent } from './ApiEvent';
import EventData from './EventData';

interface HandlerFunction {
  (event: ApiEvent, context: Context): Promise<APIGatewayProxyResult>;
}

const clone = <T>(body: unknown): T => JSON.parse(JSON.stringify(body ?? {}));

const api = function (handler: HandlerFunction): HandlerFunction {
  return async function (event: ApiEvent, context: Context): Promise<APIGatewayProxyResult> {
    event.data = new EventData(event);

    // Remove sensitive data
    const headers = <APIGatewayProxyEventHeaders>clone(event.headers);
    delete headers.authorization;
    delete headers.Authorization;
    delete headers['x-amz-security-token'];

    const multiValueHeaders = <APIGatewayProxyEventMultiValueHeaders>clone(event.multiValueHeaders);
    delete multiValueHeaders.authorization;
    delete multiValueHeaders.Authorization;
    delete multiValueHeaders['x-amz-security-token'];

    const requestContext = <APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>>clone(event.requestContext);
    delete requestContext.authorizer?.claims.email;

    // const { httpMethod, path, pathParameters, multiValueQueryStringParameters, queryStringParameters, resource, body } = event;
    // const loggedData = {
    //   httpMethod,
    //   path,
    //   pathParameters,
    //   multiValueQueryStringParameters,
    //   queryStringParameters,
    //   requestContext,
    //   resource,
    //   headers,
    //   multiValueHeaders,
    //   body: body ? '*****' : '',
    // };
    //
    // if (Config.getEnvKey() === 'exp' || Config.getEnvKey() === 'dev') {
    //   loggedData.body = body ?? '';
    // }

    // Logger.setContext('request', loggedData);
    // Logger.debug('EndpointInvoked', 'Endpoint invoked');

    try {
      return await handler(event, context);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return errorResponse(404, error.message);
      } else if (error instanceof ForbiddenException) {
        return errorResponse(403, error.message);
      } else if (error instanceof ServiceUnavailableException) {
        return errorResponse(503, error.message);
      } else if (error instanceof ConflictException) {
        return errorResponse(409, error.message);
      } else if (error instanceof NotAcceptableException) {
        return errorResponse(406, error.message);
      } else if (error instanceof BadRequestException || error instanceof ApplicationException) {
        return errorResponse(400, error.message);
      }

      return unhandledErrorResponse(error as Error);
    }
  };
};

export default api;
