import { PaginationRequest } from '../application/Pagination';
import { Search } from '../application/Search';
import { Sort } from '../application/Sort';
import { Token } from '../application/Token';
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import _ from 'lodash';

export default class EventData {
  private readonly event: APIGatewayProxyEvent;
  private readonly queryStringParams: APIGatewayProxyEventQueryStringParameters;
  private readonly pathParams: APIGatewayProxyEventPathParameters;
  private readonly body: string | null;
  private readonly headers: APIGatewayProxyEventHeaders;

  public constructor(event: APIGatewayProxyEvent) {
    this.event = event;
    this.queryStringParams = event.queryStringParameters || {};
    this.pathParams = event.pathParameters || {};
    this.body = event.body;
    this.headers = event.headers;
  }

  public get token(): Token {
    const claims: AuthorizerClaims = this.event.requestContext && this.event.requestContext.authorizer && this.event.requestContext.authorizer.claims;
    return {
      userId: claims ? claims['custom:userId'] || '' : '',
      clientId: claims?.aud || '',
    };
  }

  public get pagination(): PaginationRequest {
    return {
      limit: this.queryStringParams.limit ? Number(this.queryStringParams.limit) : undefined,
      skip: this.queryStringParams.skip ? Number(this.queryStringParams.skip) : undefined,
    };
  }

  public get search(): Search {
    return this.queryStringParams.search || '';
  }

  public get sort(): Sort {
    return {
      sort: this.queryStringParams.sort || '',
      sortType: this.queryStringParams.sortType === 'ASC' ? 'ASC' : this.queryStringParams.sortType === 'DESC' ? 'DESC' : undefined,
    };
  }

  public getPathParam(name: string): string {
    return (this.pathParams || {})[name] || '';
  }

  public getBodyValue<X>(key: string): string | number | X | X[] | null | undefined | boolean {
    const body = JSON.parse(this.body || '{}');
    return key === '$' ? body : body[key];
  }

  public getBody<T>(): T {
    return JSON.parse(this.body || '{}');
  }

  public getQueryStringParam(key: string): string | undefined {
    return this.queryStringParams[key] === '' || this.queryStringParams[key] === null ? undefined : this.queryStringParams[key];
  }

  public getQueryStringParamAsNumber(key: string): number | undefined {
    const value = this.queryStringParams[key];
    if (!value) {
      return undefined;
    }
    return +value;
  }

  public getQueryStringParamAsStringArray(key: string): string[] | undefined {
    const value = this.queryStringParams[key];
    if (!value) {
      return undefined;
    }
    return value.split(',');
  }

  public getQueryStringParamAsDate(key: string): Date | undefined {
    const value = this.queryStringParams[key];
    if (!value) {
      return undefined;
    }
    const timestamp = Date.parse(value);
    if (!isNaN(timestamp)) {
      return new Date(timestamp);
    }
    return undefined;
  }

  public getHeaders(regexFilter?: RegExp): { [name: string]: string | undefined } {
    if (!regexFilter) {
      return this.headers;
    }
    return _.pickBy(this.headers, (value: any, key: any) => regexFilter.test(key));
  }

  public endpointVersion(): string | undefined {
    return this.headers['endpoint-version'] ?? undefined;
  }
}

interface AuthorizerClaims {
  sub?: string;
  email_verified?: string;
  iss?: string;
  'custom:first_name'?: string;
  'custom:userId'?: string;
  'cognito:groups'?: string;
  phone_number_verified?: string;
  'cognito:username'?: string;
  aud?: string;
  token_use?: string;
  auth_time?: string;
  phone_number?: string;
  exp?: string;
  iat?: string;
  email?: string;
}
