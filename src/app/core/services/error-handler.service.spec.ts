import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  const service = new ErrorHandlerService();

  it('reads the message from a parsed JSON error', () => {
    const error = new HttpErrorResponse({ status: 403, error: { status: 403, message: 'Access denied' } });
    expect(service.getErrorMessage(error)).toBe('Access denied');
  });

  it('reads the message from a JSON error received as text, for responseType text requests', () => {
    const error = new HttpErrorResponse({ status: 403, error: '{"status":403,"message":"Access denied","path":"/x"}' });
    expect(service.getErrorMessage(error)).toBe('Access denied');
  });

  it('falls back to the status text when JSON has no message', () => {
    const error = new HttpErrorResponse({ status: 403, error: '{"status":403}' });
    expect(service.getErrorMessage(error)).toBe('You are not allowed to perform this action.');
  });

  it('returns plain text errors unchanged', () => {
    const error = new HttpErrorResponse({ status: 401, error: 'Invalid Token' });
    expect(service.getErrorMessage(error)).toBe('Invalid Token');
  });
});
