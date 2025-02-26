import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Genre, GenresDTO, Movie, MoviesDTO } from '../../core/models/Movie';
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

  getMovieSimilar(id: number): Observable<Movie[]> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie', id, ['similar']).pipe(map((data) => data.results.slice(0, 12)));
  }

  searchMovies(page: number, searchValue?: string): Observable<MoviesDTO> {
    const queryParams = {
      query: searchValue || '',
      page: page.toString()
    };

    const uri = searchValue ? "search/movie" : "movie/popular";
    return this.httpUtils.getRequest<MoviesDTO>(
      this.baseUrl, 
      this.apiKey, 
      uri,
      undefined,
      undefined,
      queryParams
    );
  }
  
  getMovieGenres(): Observable<Genre[]> {
    return this.httpUtils.getRequest<GenresDTO>(this.baseUrl, this.apiKey, 'genre', undefined, ['movie', 'list'])
      .pipe(map((data) => data.genres));
  }

  getMoviesByGenre(genreId: number, pageNumber = 1) {
    const queryParams = {
      with_genres: genreId.toString(),
      page: pageNumber.toString()
    };
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'discover', undefined, ['movie'], queryParams);
  }

  private sliceResults(data?: any): any {
    return { ...data, results: data.results.slice(0, 12) };
  }

}