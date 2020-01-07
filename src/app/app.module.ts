import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SubEditorComponent } from './sub-editor/sub-editor.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MessagesComponent } from './messages/messages.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { SubtitleDetailComponent } from './subtitle-detail/subtitle-detail.component';
import { SafeHtmlPipe } from './service/safe-html-pipe.pipe';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
