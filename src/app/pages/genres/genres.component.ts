import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Genre, Movie, MoviesDTO } from '../../core/models/Movie';
import { MoviesService } from '../../core/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-genres',
  standalone: false,
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit, OnDestroy {

  genres$ = new BehaviorSubject<Genre[] | null>(null);
  shows$ = new BehaviorSubject<MoviesDTO | null>(null);
  genreId = "";

  destroy$ = new Subject<void>();

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.shows$.next(null);
      this.loadMoviesByGenre();
    });

    this.getDataFromService();
  }

  ngOnDestroy(): void {
    this.genres$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMoviesByGenre(page: number = 1): void {
    this.moviesService.getMoviesByGenre(Number(this.genreId), page).subscribe((data) => {
      this.shows$.next(data);
    });
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.loadMoviesByGenre(pageNumber);
  }

  getDataFromService() {
    this.moviesService.getMovieGenres().subscribe((data) => {
      this.genres$.next(data);
    });
  }
}
