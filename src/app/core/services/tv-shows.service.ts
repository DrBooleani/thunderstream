import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpUtilsService } from './http-utils.service';
import { map, Observable } from 'rxjs';
import { Movie, MoviesDTO } from '../models/Movie';
import { TvShow } from '../models/Tv-Show';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private httpUtils: HttpUtilsService) { }

  getPopularTvShows(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest(this.baseUrl, this.apiKey, 'tv/popular').pipe(
      map(this.mapTvShowsToMovieDTO)
    );
  }
  private mapTvShowsToMovieDTO(data: any): MoviesDTO {
    return {
      page: data.page,
      results: data.results.slice(0, 12).map((tvShow: TvShow) => ({
        id: tvShow.id,
        backdrop_path: tvShow.backdrop_path,
        genre_ids: tvShow.genre_ids,
        original_language: tvShow.original_language,
        original_title: tvShow.original_name,
        overview: tvShow.overview,
        popularity: tvShow.popularity,
        poster_path: tvShow.poster_path,
        release_date: tvShow.release_date,
        title: tvShow.name,
        vote_average: tvShow.vote_average,
        vote_count: tvShow.vote_count,
        name: tvShow.first_air_date,
      })),
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  }  
}
