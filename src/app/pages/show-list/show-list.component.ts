import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { getDataFromService } from '../../shared/utils/utils';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { mapToMoviesDto } from '../../core/models/Tv-Show';

@Component({
  selector: 'app-show-list',
  standalone: false,
  
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent implements OnInit, OnDestroy, DoCheck {

  showList$ = new BehaviorSubject<MoviesDTO | null>(null);
  showsType: 'movie' | 'tv' = 'movie';

  destroy$ = new Subject<void>();

  searchValue = "";

  constructor(private moviesService: MoviesService, private tvService: TvShowsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.showsType = this.route.snapshot.params['type'];
    this.getPagedShows(this.showsType, 1);
  }

  ngDoCheck(): void {
    if (this.showsType != this.route.snapshot.params['type']) {
      this.showList$.next(null);
      this.showsType = this.route.snapshot.params['type'];
      this.getPagedShows(this.showsType, 1);
    }
  }

  ngOnDestroy(): void {
    this.showList$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPagedShows(showsType: 'movie' | 'tv', page: number, searchKeyword?: string) {
    if (showsType === 'movie') {
      getDataFromService(this.moviesService.searchMovies.bind(this.moviesService, page, searchKeyword), this.showList$);
    }

    if (showsType === 'tv') {
      this.tvService.searchTvShows(page, searchKeyword).pipe(map(mapToMoviesDto)).subscribe((data) => this.showList$.next(data));
    }
    
  }

  searchChanged() {
    this.showList$.next(null);
    this.getPagedShows(this.showsType, 1, this.searchValue);
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(this.showsType, pageNumber, this.searchValue);
  }
}
