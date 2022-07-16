import { APIGatewayProxyEvent } from 'aws-lambda';

import EventData from './EventData';

export interface ApiEvent extends APIGatewayProxyEvent {
  data: EventData;
  source: string;
}
