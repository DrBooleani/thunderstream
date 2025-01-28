import { Component, Input } from '@angular/core';
import { Movie } from '../../../core/models/Movie';
import { imagePath } from '../../../core/constants/image-path';

@Component({
  selector: 'app-show-item',
  standalone: false,
  
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent {
  @Input() showItem : Movie | null = null;
  

  getImage(backdrop_path: string): string {
    return imagePath + '/w500/' + backdrop_path;
  }
  
}
