import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';
import { getDataFromService } from '../../shared/utils/utils';

@Component({
  selector: 'app-show-list',
  standalone: false,
  
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent implements OnInit, OnDestroy {

  showList$ = new BehaviorSubject<Movie[]>([]);
  destroy$ = new Subject<void>();

  searchValue = "";

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedShows(1);
  }

  ngOnDestroy(): void {
    this.showList$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPagedShows(page: number, searchKeyword?: string) {
    getDataFromService(this.moviesService.searchMovies.bind(this.moviesService, page, searchKeyword), this.showList$);
  }

  searchChanged() {
    this.showList$.next([]);
    this.getPagedShows(1, this.searchValue);
  }
}
