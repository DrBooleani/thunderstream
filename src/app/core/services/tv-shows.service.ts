import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpUtilsService } from './http-utils.service';
import { map, Observable } from 'rxjs';
import { MoviesDTO } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private httpUtils: HttpUtilsService) { }

  getPopularTvShows(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest(this.baseUrl, this.apiKey, 'tv/popular').pipe(
      map(this.sliceResults)
    );
  }

  private sliceResults(data?: any): any {
    return { ...data, results: data.results.slice(0, 12) };
  }

}
