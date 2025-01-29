import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';
import { MoviesService } from '../../core/services/movies.service';
import { IMAGES_SIZES } from '../../core/constants/image-path';
import { Video } from '../../core/models/Video';

@Component({
  selector: 'app-show-details',
  standalone: false,
  
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit, OnDestroy {

  showId = 0;
  show$ = new BehaviorSubject<Movie | null>(null);
  showVideo$ = new BehaviorSubject<Video[]>([]);

  imagesSizes = IMAGES_SIZES;

  destroy$ = new Subject<void>();

  constructor(private router: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getShowId();
    this.getMovieOverview();
    this.getMovieVideos();
    
  }

  private getMovieOverview() {
    this.moviesService.getMovieById(this.showId).subscribe((data) => {
      this.show$.next(data);
    });
  }

  private getMovieVideos() {
    this.moviesService.getMovieVideos(this.showId).subscribe((data) => {
      this.showVideo$.next(data);
    });
  }
  private getShowId() {
    this.showId = this.router.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.show$.unsubscribe();
    this.showVideo$.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }

}
