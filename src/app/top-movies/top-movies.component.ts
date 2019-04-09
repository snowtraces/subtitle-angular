import { Component, OnInit } from '@angular/core';
import {Movie} from '../entity/movie';
import {MovieService} from '../service/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  movies: Movie[];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.getTopMovies();
  }

  getTopMovies(): void {
    this.movieService.getTopMovies()
      .subscribe(movies => this.movies = movies);
}

}
