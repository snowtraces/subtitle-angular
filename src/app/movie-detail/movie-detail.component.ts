import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MovieService} from '../service/movie.service';
import {Movie} from '../entity/movie';
import {UtilsService} from '../service/utils.service';
import {SubtitleService} from '../service/subtitle.service';
import {Subtitle} from '../entity/subtitle';
import {Lang} from '../entity/lang';

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
    this.movieService.getMovie(Number(id))
      .subscribe(movie => this.movie = movie);
  }

  private getSubtitles(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subtitleService.getSubtitles(Number(id))
      .subscribe(movie => this.subtitles = movie);
  }

  setMainColor(): void {
    const img = document.querySelector('.info-poster').querySelector('img');
    const mainColor = this.utils.getMainColor(img);
    const gradient = `linear-gradient(60deg,${mainColor[0].getColor(1)} 32%, ${mainColor[1].getColor(1)})`;
    document.querySelector('.movie-detail').querySelector('div').style.backgroundImage = gradient;
  }

  normalizeLang(language: string): Lang[] {
    const result = [];
    const langArr = language.split('');
    for (let i = 9; i >= 0; i--) {
      if (langArr[i] === '0') {
        continue;
      }
      switch (i) {
        case 9:
          result.push(new Lang(i, '简体'));
          break;
        case 8:
          result.push(new Lang(i, '繁体'));
          break;
        case 7:
          result.push(new Lang(i, '英语'));
          break;
        case 6:
          result.push(new Lang(i, '日语'));
          break;
        case 5:
          result.push(new Lang(i, '韩语'));
          break;
        case 4:
          result.push(new Lang(i, '法语'));
          break;
        case 3:
          result.push(new Lang(i, '德语'));
          break;
        default:
          result.push(new Lang(i, '其他'));
          break;
      }
    }
    return result;
  }
}
