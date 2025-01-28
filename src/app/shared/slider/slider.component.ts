import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: false,
  
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}
  
  movies$ = new BehaviorSubject<any[]>([]);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (data) => this.movies$.next(data),
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.movies$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
