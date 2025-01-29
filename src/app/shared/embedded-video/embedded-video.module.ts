import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbeddedVideoComponent } from './embedded-video.component';



@NgModule({
  declarations: [
    EmbeddedVideoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmbeddedVideoComponent
  ]
})
export class EmbeddedVideoModule { }
