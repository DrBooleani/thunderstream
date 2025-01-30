import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  exports: [
    TabViewModule,
    ImageModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    ButtonModule,
    CarouselModule,
    PaginatorModule
  ]
})
export class PrimengModule { }
