import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {SubEditorComponent} from './sub-editor/sub-editor.component';
import {HeaderComponent} from './header/header.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {MessagesComponent} from './messages/messages.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {TopMoviesComponent} from './top-movies/top-movies.component';
import {CopyrightComponent} from './copyright/copyright.component';
import {SubtitleDetailComponent} from './subtitle-detail/subtitle-detail.component';
import {SafeHtmlPipe} from './service/safe-html-pipe.pipe';
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './auth/admin/admin.component';
import {CookieService} from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { UserManagementComponent } from './auth/user-management/user-management.component';
import { RoleManagementComponent } from './auth/role-management/role-management.component';
import { ApiManagementComponent } from './auth/api-management/api-management.component';
import { SubManagementComponent } from './auth/sub-management/sub-management.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubEditorComponent,
    HeaderComponent,
    SearchBarComponent,
    MessagesComponent,
    MoviesComponent,
    MovieDetailComponent,
    FileUploadComponent,
    TopMoviesComponent,
    CopyrightComponent,
    SubtitleDetailComponent,
    SafeHtmlPipe,
    LoginComponent,
    AdminComponent,
    UserManagementComponent,
    RoleManagementComponent,
    ApiManagementComponent,
    SubManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
