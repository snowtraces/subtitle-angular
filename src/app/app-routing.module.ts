import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {SubEditorComponent} from './sub-editor/sub-editor.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {SubtitleDetailComponent} from './subtitle-detail/subtitle-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '',  redirectTo: '/home', pathMatch: 'full'},
  {path: 'subEditor', component: SubEditorComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailComponent },
  {path: 'subtitle/:id', component: SubtitleDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
