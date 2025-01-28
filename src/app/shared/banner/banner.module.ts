import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { ShowItemComponent } from './show-item/show-item.component';



@NgModule({
  declarations: [
    BannerComponent,
    ShowItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
