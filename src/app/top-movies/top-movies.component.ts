import {Component, OnInit} from '@angular/core';
import {Movie} from '../entity/movie';
import {MovieService} from '../service/movie.service';
import {UtilsService} from '../service/utils.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  KRY_HOT_MOVIES = 'key_hot_movies';
  movies: Movie[];

  constructor(
    private movieService: MovieService,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.getTopMovies();
  }

  getTopMovies(): void {
    const cacheMovies = localStorage.getItem(this.KRY_HOT_MOVIES);
    if (cacheMovies && cacheMovies !== 'undefined') {
      this.movies = JSON.parse(cacheMovies);
    }
    this.movieService.getTopMovies()
      .subscribe(movies => {
        if (this.checkIsUpdate(movies, this.movies)) {
          this.movies = movies;
          localStorage.setItem(this.KRY_HOT_MOVIES, JSON.stringify(movies));
        }
      });
  }

  checkIsUpdate(newData: Movie[], oldData: Movie[]): boolean {
    if (!newData || !oldData) {
      return true;
    }
    return newData.map(m => m.id).join() !== oldData.map(m => m.id).join();
  }
}
