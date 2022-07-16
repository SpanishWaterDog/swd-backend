export interface PaginationRequest {
  limit?: number;
  skip?: number;
}

export interface PaginationResponse<T> {
  limit: number;
  total: number;
  skip: number;
  data: T[];
}
