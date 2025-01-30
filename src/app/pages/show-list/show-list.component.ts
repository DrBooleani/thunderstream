import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MoviesDTO } from '../../core/models/Movie';
import { getDataFromService } from '../../shared/utils/utils';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-show-list',
  standalone: false,
  
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent implements OnInit, OnDestroy {

  showList$ = new BehaviorSubject<MoviesDTO | null>(null);
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
    this.showList$.next(null);
    this.getPagedShows(1, this.searchValue);
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(pageNumber, this.searchValue);
  }
}
