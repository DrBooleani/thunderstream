import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  exports: [
    TabViewModule,
    ImageModule,
    CarouselModule
  ]
})
export class PrimengModule { }
