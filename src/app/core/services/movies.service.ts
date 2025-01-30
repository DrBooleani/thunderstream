import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Movie, MoviesDTO } from '../../core/models/Movie';
import { HttpUtilsService } from './http-utils.service';
import { Video, VideoDTO } from '../models/Video';
import { Image, ImagesDTO } from '../models/Image';
import { Actor, CreditsDTO } from '../models/Actor';

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

  getMovieVideos(id: number): Observable<Video[]> {
    return this.httpUtils.getRequest<VideoDTO>(this.baseUrl, this.apiKey, 'movie', id, ['videos']).pipe(map((data) => data.results));
  }

  getMoviePhotos(id: number): Observable<Image[]> {
    return this.httpUtils.getRequest<ImagesDTO>(this.baseUrl, this.apiKey, 'movie', id, ['images']).pipe(map((data) => data.backdrops));
  }

  getMovieCast(id: number): Observable<Actor[]> {
    return this.httpUtils.getRequest<CreditsDTO>(this.baseUrl, this.apiKey, 'movie', id, ['credits']).pipe(map((data) => data.cast));
  }

  getMovieSimilar(id: number): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie', id, ['similar']).pipe(map((this.sliceResults)));
  }

  searchMovies(page: number, searchValue?: string): Observable<Movie[]> {
    const queryParams = {
      query: searchValue || '',
      page: page.toString()
    };

    
    return this.httpUtils.getRequest<MoviesDTO>(
      this.baseUrl, 
      this.apiKey, 
      'search/movie',
      undefined,
      undefined,
      queryParams
    ).pipe(map((data) => data.results));
  }
  
  private sliceResults(data?: any): any {
    return { ...data, results: data.results.slice(0, 12) };
  }

}