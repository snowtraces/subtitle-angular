import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {SubEditorComponent} from './sub-editor/sub-editor.component';
import {MoviesComponent} from './movies/movies.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '',  redirectTo: '/home', pathMatch: 'full'},
  {path: 'subEditor', component: SubEditorComponent},
  {path: 'movies', component: MoviesComponent},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
