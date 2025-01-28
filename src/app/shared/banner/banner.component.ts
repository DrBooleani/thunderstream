import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { MoviesService } from '../../core/services/movies.service';

@Component({
  selector: 'app-banner',
  standalone: false,
  
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}

  upcomingMovies$ = new BehaviorSubject<MoviesDTO | null>(null);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getUpcomingMovies();
  }

  ngOnDestroy(): void {
    this.upcomingMovies$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUpcomingMovies(): void {
    this.moviesService.getUpcomingMovies().subscribe((data) => {
      this.upcomingMovies$.next(data);
    });
  }
  

}
