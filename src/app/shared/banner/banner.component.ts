import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';

@Component({
  selector: 'app-banner',
  standalone: false,
  
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() shows: Movie[] = [];
  @Input() title = '';
}
