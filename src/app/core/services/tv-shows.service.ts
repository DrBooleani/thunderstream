import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpUtilsService } from './http-utils.service';
import { map, Observable } from 'rxjs';
import { Tvshow, TvshowsDto } from '../models/Tv-Show';
import { VideoDTO } from '../models/Video';
import { ImagesDTO } from '../models/Image';
import { CreditsDTO } from '../models/Actor';


@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private httpUtils: HttpUtilsService) {}

  getPopularTvShows(): Observable<TvshowsDto> {
    return this.httpUtils.getRequest(this.baseUrl, this.apiKey, 'tv/popular');
  }

  getTvShowsByType(type: string, count = 20) {
    return this.httpUtils
      .getRequest<TvshowsDto>(this.baseUrl, this.apiKey, `tv/${type}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  getTvShowById(id: number) {
    return this.httpUtils.getRequest<Tvshow>(this.baseUrl, this.apiKey, `tv`, id);
  }

  getTvShowVideos(id: number) {
    return this.httpUtils
      .getRequest<VideoDTO>(this.baseUrl, this.apiKey, 'tv', id, ['videos'])
      .pipe(map((data) => data.results));
  }

  getTvShowImages(id: number) {
    return this.httpUtils
      .getRequest<ImagesDTO>(this.baseUrl, this.apiKey, 'tv', id, ['images'])
      .pipe(map((data) => data.backdrops));
  }

  getTvShowCast(id: number) {
    return this.httpUtils
      .getRequest<CreditsDTO>(this.baseUrl, this.apiKey, 'tv', id, ['credits'])
      .pipe(map((data) => data.cast));
  }

  getTvShowSimilar(id: number) {
    return this.httpUtils
      .getRequest<TvshowsDto>(this.baseUrl, this.apiKey, 'tv', id, ['similar'])
      .pipe(map((data) => data.results.slice(0, 12)));
  }

  searchTvShows(page: number, searchValue?: string) {
    const queryParams = {
      query: searchValue || '',
      page: page.toString(),
    };

    const uri = searchValue ? 'search/tv' : 'tv/popular';
    return this.httpUtils.getRequest<TvshowsDto>(
      this.baseUrl,
      this.apiKey,
      uri,
      undefined,
      undefined,
      queryParams
    );
  }
}
