import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(private http: HttpClient) { }

  buildUrl(baseUrl: string, apiKey: string, endpoint: string, id?: number): string {
    if (id != null) {
      return `${baseUrl}${endpoint}/${id}${apiKey}`;
    }
    return `${baseUrl}${endpoint}${apiKey}`;
  }

  getRequest<T>(baseUrl: string, apiKey: string, endpoint: string, id?: number) {
    const url = this.buildUrl(baseUrl, apiKey, endpoint, id);
    return this.http.get<T>(url).pipe(
      take(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
