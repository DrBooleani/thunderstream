import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagePath } from '../../core/constants/image-path';

@Component({
  selector: 'app-slider',
  standalone: false,
  animations: [
    trigger("slideFade", [
      state("void", style({opacity: 0})),
      transition("void <=> *", [animate('1s')]),
    ])
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}

  slideIndex = 0;  
  movies$ = new BehaviorSubject<MoviesDTO | null>(null);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getAllMovies();
    this.changeSlide();
  }

  private changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }

  private getAllMovies() {
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

  getSliderImage(backdrop_path: string): string {
    return imagePath + backdrop_path;
  }
}
