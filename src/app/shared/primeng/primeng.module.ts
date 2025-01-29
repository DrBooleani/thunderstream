import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';

@NgModule({
  exports: [
    TabViewModule,
    ImageModule
  ]
})
export class PrimengModule { }
