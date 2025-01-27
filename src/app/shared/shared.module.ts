import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

const SHARED_COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
    NgOptimizedImage,
    RouterModule
  ],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
