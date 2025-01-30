import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';


@NgModule({
  exports: [
    TabViewModule,
    ImageModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    ButtonModule,
    CarouselModule
  ]
})
export class PrimengModule { }
