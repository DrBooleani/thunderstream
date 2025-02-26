import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailsComponent } from './pages/show-details/show-details.component';
import { ShowListComponent } from './pages/show-list/show-list.component';
import { GenresComponent } from './pages/genres/genres.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:type', component: ShowListComponent },
  { path: 'detail/:id/:type', component: ShowDetailsComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:genreId', component: GenresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
