import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Movie, MoviesDTO } from '../../core/models/Movie';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private httpUtils: HttpUtilsService) { }

  getPopularMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/popular').pipe(
      map(this.sliceResults)
    );
  }

  getUpcomingMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/upcoming').pipe(
      map(this.sliceResults)
    );
  }

  getTopRatedMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/top_rated').pipe(
      map(this.sliceResults)
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.httpUtils.getRequest<Movie>(this.baseUrl, this.apiKey, 'movie', id);
  }

  private sliceResults(data?: any): any {
    return { ...data, results: data.results.slice(0, 12) };
  }
  
}