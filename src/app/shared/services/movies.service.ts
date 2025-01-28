import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, take } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<MoviesDTO> {
    return this.http.get<MoviesDTO>(`${this.baseUrl}movie/popular${this.apiKey}`).pipe(take(1));
  }
}
