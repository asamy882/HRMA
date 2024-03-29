export class ApplicationError extends Error {

  httpStatus ? = 404;
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled = false;

  constructor(message?: string) {
    super(message);
    this.name = ApplicationError.name;
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
