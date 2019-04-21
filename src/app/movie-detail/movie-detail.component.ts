/* tslint:disable:no-conditional-assignment no-bitwise */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MovieService} from '../service/movie.service';
import {Movie} from '../entity/movie';
import {UtilsService} from '../service/utils.service';
import {SubtitleService} from '../service/subtitle.service';
import {Subtitle} from '../entity/subtitle';
import {Lang} from '../entity/lang';
import {Color} from '../entity/color';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  subtitles: Subtitle[];
  color: Color[];

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
    this.color = [];
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

  ratingCalc(movie: Movie): number {
    return movie.rating / 200 || 0;
  }

  setMainColor(): void {

    const img = document.querySelector('.info-poster').querySelector('img');
    const blockSize = 47;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const rgbArray = [];
    for (let j = 0; j < 8; j++) {
      rgbArray[j] = new Color(0, 0, 0, 0);
    }
    if (!context) {
      return;
    }
    const height = canvas.height = img.naturalHeight;
    const width = canvas.width = img.naturalWidth;
    context.drawImage(img, 0, 0);
    const data = context.getImageData(0, 0, width, height);
    const length = data.data.length;
    let i = -4;
    while ((i += blockSize * 4) < length) {
      const rIndex = (data.data[i] - 128) >> 31;
      const gIndex = (data.data[i + 1] - 128) >> 31;
      const bIndex = (data.data[i + 2] - 128) >> 31;
      const index = ((rIndex + 1) << 2) + ((gIndex + 1) << 1) + (bIndex + 1);
      rgbArray[index].r += data.data[i];
      rgbArray[index].g += data.data[i + 1];
      rgbArray[index].b += data.data[i + 2];
      rgbArray[index].count++;
    }
    // 按颜色多少排序
    rgbArray.sort((a, b) => b.count - a.count);
    let numCount = 0;
    for (let k = 0; k < 8; k++) {
      const r = Math.round(rgbArray[k].r / rgbArray[k].count);
      const b = Math.round(rgbArray[k].b / rgbArray[k].count);
      const g = Math.round(rgbArray[k].g / rgbArray[k].count);
      if (r >= 200 && g >= 200 && b >= 200) {
        continue;
      }
      if (this.color.length === 1 && r < 56 && g < 56 && b < 56) {
        continue;
      }
      if (k < 4 && this.color.length === 1) {
        const distance = this.colorDistance(this.color[0], new Color(r, g, b, 1));
        if (distance < 180) {
          continue;
        }
      }
      this.color.push(new Color(r, g, b, 1));
      numCount++;
      if (numCount === 2) {
        // 按颜色深浅排序
        this.color.sort((cA, cB) => cA.r + cA.g + cA.b - cB.r - cB.g - cB.b);
        const gradient = 'linear-gradient(60deg,' + this.color[0].getColor() + ' 32%, ' + this.color[1].getColor() + ')';
        document.querySelector('.movie-detail').querySelector('div').style.backgroundImage = gradient;
        break;
      }
    }
  }

  normalizeLang(language: string): Lang[] {
    const result = [];
    const langArr = language.split('');
    for (let i = 9; i >= 0; i--) {
      if (langArr[i] === '0') { continue; }
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

  colorDistance(colorA: Color, colorB: Color): number {
    const rmean = (colorA.r + colorB.r) / 2;
    const r = colorA.r - colorB.r;
    const g = colorA.g - colorB.g;
    const b = colorA.b - colorB.b;
    const distance = Math.sqrt((2 + rmean / 256) * r * r + 4 * g * g + (2 + (255 - rmean) / 256) * b * b);
    console.log(colorA, colorB, distance)
    return distance;
  }

}
