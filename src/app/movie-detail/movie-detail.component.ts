import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MovieService} from '../service/movie.service';
import {Movie} from '../entity/movie';
import {UtilsService} from '../service/utils.service';

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
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.getMovie();
  }

  private getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(Number(id))
      .subscribe(movie => this.movie = movie);
  }

  ratingCalc(movie: Movie): number {
    return movie.rating / 200 || 0;
  }

  setMainColor(): void {
    function rgb(r, g, b, count) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.count = count;
    }

    const img = document.querySelector('.info-poster').querySelector('img');
    const blockSize = 47;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const rgbArray = [];
    for (let j = 0; j < 8; j++) {
      rgbArray[j] = new rgb(0, 0, 0, 0);
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
    rgbArray.sort((a, b) => b.count - a.count);
    const color = [];
    let numCount = 0;
    for (let k = 0; k < 8; k++) {
      const r = Math.round(rgbArray[k].r / rgbArray[k].count);
      const b = Math.round(rgbArray[k].b / rgbArray[k].count);
      const g = Math.round(rgbArray[k].g / rgbArray[k].count);
      if (k < 2 && r <= 32 && g <= 32 && b <= 32) {
        continue;
      }
      if (k < 2 && r >= 224 && g >= 224 && b >= 224) {
        continue;
      }
      if (k < 2 && Math.abs(r - g) < 32 && Math.abs(r - b) < 32) {
        continue;
      }
      const mainColor = 'rgba(' + r + ',' + g + ',' + b + ', 0.15)';
      color.push(mainColor);
      numCount++;
      if (numCount === 2) {
        break;
      }
    }
    const gradient = 'linear-gradient(60deg,' + color[0] + ' 32%, ' + color[1] + ')';
    document.querySelector('.movie-detail').querySelector('div').style.backgroundImage = gradient;
  }
}
