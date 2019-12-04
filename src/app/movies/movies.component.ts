import {Component, OnInit} from '@angular/core';
import {Movie} from '../entity/movie';
import {MovieService} from '../service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../service/utils.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  term: string;

  getMovies(): void {
    this.movieService.getMovies(this.term)
      .subscribe(movies => this.movies = movies);
  }

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.term = this.route.snapshot.paramMap.get('term');
    this.getMovies();
  }

}
