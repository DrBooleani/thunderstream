import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}movie/popular${this.apiKey}`).pipe(take(1));
  }
}
