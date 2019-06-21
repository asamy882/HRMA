import {ErrorHandler, Injectable} from "@angular/core";
import { ApplicationError } from "../models/application-error.class";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  private errors: ApplicationError[] = [];

  constructor(/*private messageService: MessageService*/) {
    super();
  }

  handleError(error: any): void {
    if (error instanceof ApplicationError) {
      this.addError(error);
    } else {
      if (error.rejection instanceof ApplicationError) {
        this.addError(error.rejection);
      } else {
        super.handleError(error);
      }
    }
  }

  addError(error: ApplicationError) {
    this.errors.push(error);
    // this.messageService.add({severity: 'error', summary: 'Error Message', detail: error.message});
  }
}
