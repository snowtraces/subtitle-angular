import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MovieService} from '../service/movie.service';
import {Movie} from '../entity/movie';
import {UtilsService} from '../service/utils.service';
import {SubtitleService} from '../service/subtitle.service';
import {Subtitle} from '../entity/subtitle';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  subtitles: Subtitle[];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private subtitleService: SubtitleService,
    public utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.getMovie();
    this.getSubtitles();
  }

  private getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const movieCache = this.utils.getMovieCache(id);
    if (movieCache) {
      this.movie = movieCache;
    } else {
      this.movieService.getMovie(Number(id))
        .subscribe(movie => {
          this.movie = movie;
          this.utils.setMovieCache(movie);
        });
    }
  }

  private getSubtitles(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subtitleService.getSubtitles(Number(id))
      .subscribe(movie => this.subtitles = movie);
  }

  setMainColor(): void {
    const img = document.querySelector('.info-poster').querySelector('img');
    const mainColor = this.utils.getMainColor(img);
    this.utils.setGradientBackground(mainColor[0].setOpacity(1), mainColor[1].setOpacity(1), '.movie-section');
  }
}
