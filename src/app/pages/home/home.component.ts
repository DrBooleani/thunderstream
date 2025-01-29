import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Movie, MoviesDTO } from '../../core/models/Movie';
import { TvShowsService } from '../../core/services/tv-shows.service';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private moviesService: MoviesService, 
    private tvShowsService: TvShowsService) {}

  popularMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  upcomingMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  topRatedMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  popularTvShows$ = new BehaviorSubject<MoviesDTO | null>(null);

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getPopularMovies();
    this.getUpcomingMovies();
    this.getTopRatedMovies();
    this.getPopularTvShows();
  }

  ngOnDestroy(): void {
    this.popularMovies$.unsubscribe();
    this.upcomingMovies$.unsubscribe();
    this.topRatedMovies$.unsubscribe();
    this.popularTvShows$.unsubscribe();
    
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPopularMovies(): void {
    this.moviesService.getPopularMovies().subscribe((data) => {
      this.popularMovies$.next(data);
    });
  }
  getUpcomingMovies(): void {
    this.moviesService.getUpcomingMovies().subscribe((data) => {
      this.upcomingMovies$.next(data);
    });
  }

  getTopRatedMovies(): void {
    this.moviesService.getTopRatedMovies().subscribe((data) => {
      this.topRatedMovies$.next(data);
    }); 
  }

  getPopularTvShows(): void {
    this.tvShowsService.getPopularTvShows().subscribe((data) => {
      this.popularTvShows$.next(data);
    });
  }

}
