import { APIGatewayProxyResult } from 'aws-lambda';
import Logger from "@swd/logger";

export function response<T>(
  code: number,
  response?: T,
  contentType?: string,
  cacheControlMaxAgeInMinutes?: number,
  isBase64Encoded?: boolean
): APIGatewayProxyResult {
  let result: APIGatewayProxyResult = {
    statusCode: code || 200,
    body: response ? JSON.stringify(response) : '',
    headers: {
      ...getCORSAttachment(),
    },
  };

  if (contentType && result.headers) {
    result.headers['Content-Type'] = contentType;
  }

  if (cacheControlMaxAgeInMinutes && result.headers) {
    result.headers['Cache-Control'] = `max-age=${cacheControlMaxAgeInMinutes * 60}`;
  }

  if (isBase64Encoded) {
    result = { ...result, isBase64Encoded: true };
  }

  return result;
}

export function errorResponse(code: number, message: string): APIGatewayProxyResult {
  Logger.debug('controllerError', message, { code });
  return response(code, { message });
}

export function unhandledErrorResponse(error: Error): APIGatewayProxyResult {
  Logger.error('unhandledError', 'Unhandled exception', undefined, error);
  return response(500, { message: 'Unknown Error' });
}

function getCORSAttachment(): { [header: string]: boolean | number | string } {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Security-Policy': `Include default-src 'self'`,
    'Strict-Transport-Security': 'max-age=300; includeSubDomains; preload',
    'X-Content-Type-Options': `'nosniff'`,
    'X-XSS-Protection': `'1'`,
  };
}
