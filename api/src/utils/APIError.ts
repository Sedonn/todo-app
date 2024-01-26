export class APIError extends Error {
  /** Http error code. */
  public readonly httpCode: number;

  /** Instance of a error, if exists. */
  public readonly errorInstance?: unknown;

  constructor(httpCode: number, message: string, errorInstance: unknown = undefined) {
    super(message);

    this.httpCode = httpCode;
    this.errorInstance = errorInstance;
  }
}
