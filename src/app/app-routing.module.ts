import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailsComponent } from './pages/show-details/show-details.component';
import { ShowListComponent } from './pages/show-list/show-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ShowListComponent },
  { path: 'detail/:id', component: ShowDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
