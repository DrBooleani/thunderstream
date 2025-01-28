import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}

  upcomingMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  topRatedMovies$ = new BehaviorSubject<MoviesDTO | null>(null);

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getUpcomingMovies();
    this.getTopRatedMovies();
  }

  ngOnDestroy(): void {
    this.upcomingMovies$.unsubscribe();
    this.topRatedMovies$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
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

}
