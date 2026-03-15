import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  getErrorMessage(error: HttpErrorResponse): string {

    if (error.error) {
      if (typeof error.error === 'string' && error.error.trim()) {
        return error.error;
      }

      if (error.error.message) {
        return error.error.message;
      }
    }

    switch (error.status) {
      case 0:
        return 'Unable to connect to server. Please try again.';
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You are not allowed to perform this action.';
      case 404:
        return 'Requested resource was not found.';
      case 500:
        return 'Something went wrong on the server.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}