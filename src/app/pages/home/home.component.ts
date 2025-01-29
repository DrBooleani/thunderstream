import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { getDataFromService } from '../../shared/utils/utils';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvShowsService
  ) {}

  popularMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  upcomingMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  topRatedMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  popularTvShows$ = new BehaviorSubject<MoviesDTO | null>(null);

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    getDataFromService(
      this.moviesService.getPopularMovies.bind(this.moviesService),
      this.popularMovies$
    );
    getDataFromService(
      this.moviesService.getUpcomingMovies.bind(this.moviesService),
      this.upcomingMovies$
    );
    getDataFromService(
      this.moviesService.getTopRatedMovies.bind(this.moviesService),
      this.topRatedMovies$
    );
    getDataFromService(
      this.tvShowsService.getPopularTvShows.bind(this.tvShowsService),
      this.popularTvShows$
    );
  }

  ngOnDestroy(): void {
    this.popularMovies$.unsubscribe();
    this.upcomingMovies$.unsubscribe();
    this.topRatedMovies$.unsubscribe();
    this.popularTvShows$.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
