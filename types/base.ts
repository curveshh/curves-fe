export interface BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type BaseApiError = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export type Pagination = {
  page?: number;
  limit?: number;
};

export interface BaseOption {
  label: string;
  value: string;
}
