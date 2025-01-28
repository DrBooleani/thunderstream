import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, take, throwError } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { HttpUtilsService } from './http-utils.service';
import { imagePath } from '../constants/image-path';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private httpUtils: HttpUtilsService) { }

  getPopularMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/popular');
  }

  getUpcomingMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/upcoming');
  }

  getTopRatedMovies(): Observable<MoviesDTO> {
    return this.httpUtils.getRequest<MoviesDTO>(this.baseUrl, this.apiKey, 'movie/top_rated');
  }
  
}