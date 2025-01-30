import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Movie, MoviesDTO } from '../../core/models/Movie';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { getDataFromService } from '../../shared/utils/utils';
import { mapToMovies } from '../../core/models/Tv-Show';

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
  popularTvShows$ = new BehaviorSubject<Movie[] | null>([]);

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
    this.tvShowsService.getTvShowsByType('popular', 12).pipe(
      map(mapToMovies)
    ).subscribe(this.popularTvShows$);
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
