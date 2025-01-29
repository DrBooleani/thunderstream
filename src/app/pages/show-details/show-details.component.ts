import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';
import { MoviesService } from '../../core/services/movies.service';
import { IMAGES_SIZES } from '../../core/constants/image-path';
import { Video } from '../../core/models/Video';
import { Image } from '../../core/models/Image';
import { getDataFromServiceById } from '../../shared/utils/utils';
import { Actor } from '../../core/models/Actor';

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
  showImage$ = new BehaviorSubject<Image[]>([]);
  showCast$ = new BehaviorSubject<Actor[]>([]);

  imagesSizes = IMAGES_SIZES;

  destroy$ = new Subject<void>();

  constructor(private router: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getShowId();
    getDataFromServiceById(this.moviesService.getMovieById.bind(this.moviesService), this.show$, this.showId);
    getDataFromServiceById(this.moviesService.getMovieVideos.bind(this.moviesService), this.showVideo$, this.showId);
    getDataFromServiceById(this.moviesService.getMoviePhotos.bind(this.moviesService), this.showImage$, this.showId);
    getDataFromServiceById(this.moviesService.getMovieCast.bind(this.moviesService), this.showCast$, this.showId);
  }

  private getShowId() {
    this.showId = this.router.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.show$.unsubscribe();
    this.showVideo$.unsubscribe();
    this.showImage$.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
