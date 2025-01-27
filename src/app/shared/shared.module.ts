import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

const SHARED_COMPONENTS = [
  HeaderComponent,
  FooterComponent
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
    DatePipe,
    NgOptimizedImage,
    RouterModule
  ],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
