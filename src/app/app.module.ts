import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailsComponent } from './pages/show-details/show-details.component';
import { BannerModule } from './shared/banner/banner.module';
import { SharedModule } from './shared/shared.module';
import { SliderModule } from './shared/slider/slider.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { EmbeddedVideoModule } from "./shared/embedded-video/embedded-video.module";
import { ShowListComponent } from './pages/show-list/show-list.component';
import { FormsModule } from '@angular/forms';
import { GenresComponent } from './pages/genres/genres.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowDetailsComponent,
    ShowListComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    PrimengModule,
    SharedModule,
    SliderModule,
    BannerModule,
    EmbeddedVideoModule
],
  providers: [
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
