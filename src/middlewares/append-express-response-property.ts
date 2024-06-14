import { Request, Response, NextFunction } from "express";

interface ResponseWithSuccessError extends Response {
  success: (body: SuccessResponseBody) => Response;
  error: (body: ErrorResponseBody) => Response;
}

interface SuccessResponseBody {
  message?: string;
  data?: unknown;
}

interface ErrorResponseBody {
  status: number;
  message: string;
  error?: unknown;
}

const transformSuccessBody = (res: Response, body: SuccessResponseBody) => {
  const message = body?.message;
  Reflect.deleteProperty(body, "message");

  const transformedBody = {
    status: res.statusCode,
    success: true,
    message,
    requestTime: new Date().getTime(),
    data: body?.data ?? body,
  };

  return transformedBody;
};

const transformErrorBody = (body: ErrorResponseBody) => {
  const { status, message, error } = body;

  const transformedBody = {
    status,
    success: false,
    message,
    error,
    requestTime: new Date().getTime(),
    data: {},
  };

  return transformedBody;
};

const appendSuccess = (req: Request, res: ResponseWithSuccessError, next: NextFunction) => {
  res.success = (body: SuccessResponseBody) => res.json(transformSuccessBody(res, body));
  next();
};

const appendError = (req: Request, res: ResponseWithSuccessError, next: NextFunction) => {
  res.error = (body: ErrorResponseBody) => res.json(transformErrorBody(body));
  next();
};

export const appendExpressResponseProperty = {
  appendSuccess,
  appendError,
};
