export interface ApiErrorResponse {
  status: string;
  statusCode: number;
  error: {
    code: string;
    message: string;
    details: string;
    timestamp: string;
    path: {
      value: string;
      hasValue: boolean;
    };
    suggestion?: string;
    stackTrace?: string;
  };
  requestId: string;
  documentation_url: string;
}
