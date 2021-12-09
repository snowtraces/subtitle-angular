import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SubEditorComponent} from './sub-editor/sub-editor.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {SubtitleDetailComponent} from './subtitle-detail/subtitle-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {AdminComponent} from './auth/admin/admin.component';
import {UserManagementComponent} from './auth/user-management/user-management.component';
import {RoleManagementComponent} from './auth/role-management/role-management.component';
import {ApiManagementComponent} from './auth/api-management/api-management.component';
import {SubManagementComponent} from './auth/sub-management/sub-management.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'subEditor', component: SubEditorComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'subtitle/:mid/:id', component: SubtitleDetailComponent},
  {path: 'auth/login', component: LoginComponent},
  {
    path: 'auth/admin', component: AdminComponent, children: [
      {path: 'user', component: UserManagementComponent},
      {path: 'role', component: RoleManagementComponent},
      {path: 'api', component: ApiManagementComponent},
      {path: 'sub', component: SubManagementComponent},
    ]
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
})
export class AppRoutingModule {
}
