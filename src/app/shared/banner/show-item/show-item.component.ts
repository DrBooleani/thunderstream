import { Component, Input, OnDestroy} from '@angular/core';
import { Movie } from '../../../core/models/Movie';
import { imagePath } from '../../../core/constants/image-path';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-show-item',
  standalone: false,
  
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent implements OnDestroy {
  @Input() showItem : Movie | null = null;
  @Input() showType: 'tv' | 'movie' = 'movie';

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getImage(backdrop_path: string): string {
    return imagePath + '/w500/' + backdrop_path;
  }
  
}
