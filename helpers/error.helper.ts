import { StatusCodes } from 'http-status-codes';

export enum ErrorTypes {
  validationError = StatusCodes.BAD_REQUEST,
  internalServerError = StatusCodes.INTERNAL_SERVER_ERROR,
  unauthorizedError = StatusCodes.UNAUTHORIZED,
  forbiddenError = StatusCodes.FORBIDDEN,
  tooManyRequest = StatusCodes.TOO_MANY_REQUESTS,
  notAcceptable= StatusCodes.NOT_ACCEPTABLE,
  notFound= StatusCodes.NOT_FOUND,
}

/**
 *
 * @param errorMessage Error message that will be thrown to the user
 * @param errorType ErrorTypes
 * @returns error
 */
export function errorGenerator(errorMessage: string, errorType: ErrorTypes, data?: any) {
  const error = new Error(errorMessage);
  error.name = ErrorTypes[errorType];
  return data ? { error, data } : error;
}

export function errorHandler(error: { message: string; name: ErrorTypes }) {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = error.message ?? 'Internal Server Error';
  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.BAD_REQUEST) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = error?.message ?? 'Bad Request';
  }

  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.FORBIDDEN) {
    statusCode = StatusCodes.FORBIDDEN;
    message = error?.message ?? 'Bad Request';
  }

  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.UNAUTHORIZED) {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = error?.message ?? 'Unauthorized';
  }

  // @ts-ignore
  if (error?.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Token is expired';
  }

  // @ts-ignore
  if (error?.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid Token';
  }
  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.INTERNAL_SERVER_ERROR && error?.message) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = error?.message ?? 'Internal Server Error';
  }
  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.TOO_MANY_REQUESTS) {
    statusCode = StatusCodes.TOO_MANY_REQUESTS;
    message = error?.message ?? 'too many requests';
  }

  // @ts-ignore
  if (ErrorTypes[error?.name] === StatusCodes.NOT_ACCEPTABLE) {
    statusCode = StatusCodes.NOT_ACCEPTABLE;
    message = error?.message ?? 'Not Acceptable';
  }

  return { statusCode, message };
}
