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
    getDataFromService(this.moviesService.searchMovies.bind(this.moviesService, 1, this.searchValue), this.showList$);
  }

  ngOnDestroy(): void {
    this.showList$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
