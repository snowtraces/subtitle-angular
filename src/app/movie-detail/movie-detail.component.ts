import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {MovieService} from '../service/movie.service';
import {Movie} from '../entity/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  private getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(Number(id))
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }
}
