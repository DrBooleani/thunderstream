import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(private http: HttpClient) { }

  buildUrl(baseUrl: string, apiKey: string, endpoint: string, id?: number, moreFields?: string[]): string {
    let url = `${baseUrl}${endpoint}`;
    
    if (id != null) {
      url = `${url}/${id}`;
    }

    if (moreFields && moreFields.length > 0) {
      moreFields.forEach(field => {
        url = `${url}/${field}`;
      });
    }

    url = `${url}${apiKey}`;

    return url;
  }

  getRequest<T>(baseUrl: string, apiKey: string, endpoint: string, id?: number, moreFields?: string[]) {
    const url = this.buildUrl(baseUrl, apiKey, endpoint, id, moreFields);
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
