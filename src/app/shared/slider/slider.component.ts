import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../../core/models/Movie';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagePath } from '../../core/constants/image-path';

@Component({
  selector: 'app-slider',
  standalone: false,
  animations: [
    trigger("slideFade", [
      state("void", style({opacity: 0})),
      transition("void <=> *", [animate('1s')]),
    ])
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: Movie[] = [];
  @Input() isHeader = false;

  slideIndex = 0;  
  destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    if (!this.isHeader) {
      this.changeSlide();
    }
  }

  private changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSliderImage(backdrop_path: string): string {
    return imagePath + '/w1280/' + backdrop_path;
  }
}
