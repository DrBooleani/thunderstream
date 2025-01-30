import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  exports: [
    TabViewModule,
    ImageModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    CarouselModule
  ]
})
export class PrimengModule { }
