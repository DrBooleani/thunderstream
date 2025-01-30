import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';
import { MoviesService } from '../../core/services/movies.service';
import { IMAGES_SIZES } from '../../core/constants/image-path';
import { Video } from '../../core/models/Video';
import { Image } from '../../core/models/Image';
import { getDataFromServiceById } from '../../shared/utils/utils';
import { Actor } from '../../core/models/Actor';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { mapToMovie, mapToMovies } from '../../core/models/Tv-Show';

@Component({
  selector: 'app-show-details',
  standalone: false,
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit, OnDestroy {

  showId = 0;
  showType: 'tv' | 'movie' = 'movie';

  show$ = new BehaviorSubject<Movie | null>(null);
  showVideo$ = new BehaviorSubject<Video[]>([]);
  showImage$ = new BehaviorSubject<Image[]>([]);
  showCast$ = new BehaviorSubject<Actor[]>([]);
  showSimilars$ = new BehaviorSubject<Movie[]>([]);
  previousShowId: number = 0;

  imagesSizes = IMAGES_SIZES;

  destroy$ = new Subject<void>();

  constructor(private router: ActivatedRoute, private moviesService: MoviesService, private tvService: TvShowsService) { }

  ngOnInit(): void {
    this.checkType();
    this.getShowId();
    this.loadDataForShow();
  }

  ngDoCheck(): void {
    if (this.router.snapshot.params['id'] !== this.showId) {
      this.cleanShows();
      this.checkType();
      this.getShowId();
      this.loadDataForShow();
    }
  }

  
  loadDataForShow() {
    if (this.showType === 'tv') {
      this.tvService
        .getTvShowById(this.showId)
        .pipe(map(mapToMovie))
        .subscribe((data) => {
          this.show$.next(data);
        });
      this.tvService.getTvShowVideos(this.showId).subscribe((data) => this.showVideo$.next(data));
      this.tvService.getTvShowImages(this.showId).subscribe((data) => {
        this.showImage$.next(data);
      });
      this.tvService.getTvShowCast(this.showId).subscribe((data) => {
        this.showCast$.next(data);
      });

      this.tvService
        .getTvShowSimilar(this.showId)
        .pipe(map(mapToMovies)).subscribe((data) => {
          this.showSimilars$.next(data);
        });
    }
    
    if (this.showType === 'movie') {
      getDataFromServiceById(this.moviesService.getMovieById.bind(this.moviesService), this.show$, this.showId);
      getDataFromServiceById(this.moviesService.getMovieVideos.bind(this.moviesService), this.showVideo$, this.showId);
      getDataFromServiceById(this.moviesService.getMoviePhotos.bind(this.moviesService), this.showImage$, this.showId);
      getDataFromServiceById(this.moviesService.getMovieCast.bind(this.moviesService), this.showCast$, this.showId);
      getDataFromServiceById(this.moviesService.getMovieSimilar.bind(this.moviesService), this.showSimilars$, this.showId);
    }
    
  }

  cleanShows() {
    this.show$.next(null);
    this.showVideo$.next([]);
    this.showImage$.next([]);
    this.showSimilars$.next([]);
    this.showCast$.next([]);
  }

  private getShowId() {
    this.showId = this.router.snapshot.params['id'];
  }

  private checkType() {
    this.showType = this.router.snapshot.params['type'];
  }

  ngOnDestroy(): void {
    this.show$.unsubscribe();
    this.showVideo$.unsubscribe();
    this.showImage$.unsubscribe();
    this.showSimilars$.unsubscribe();
    this.showCast$.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
