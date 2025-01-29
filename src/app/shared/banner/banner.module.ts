import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BannerComponent,
    ShowItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
