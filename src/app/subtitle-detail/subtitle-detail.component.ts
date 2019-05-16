import {Component, OnInit} from '@angular/core';
import {Movie} from '../entity/movie';
import {Subtitle} from '../entity/subtitle';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../service/movie.service';
import {SubtitleService} from '../service/subtitle.service';
import {UtilsService} from '../service/utils.service';

@Component({
  selector: 'app-subtitle-detail',
  templateUrl: './subtitle-detail.component.html',
  styleUrls: ['./subtitle-detail.component.css']
})
export class SubtitleDetailComponent implements OnInit {
  subtitleId: string;
  movie: Movie;
  subtitle: Subtitle;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private subtitleService: SubtitleService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.subtitleId = (this.route.snapshot.paramMap.get('id'));
    this.getMovieBySubtitleId();
    this.getSubtitleById();
  }

  private getMovieBySubtitleId(): void {
    this.movieService.getMovieBySubtitleId(this.subtitleId)
      .subscribe(movie => this.movie = movie);
  }

  private getSubtitleById(): void {
    this.subtitleService.getSubtitleById(this.subtitleId)
      .subscribe(subtitle => this.subtitle = subtitle);
  }

  setMainColor(): void {
    const img = document.querySelector('.info-poster').querySelector('img');
    const mainColor = this.utils.getMainColor(img);
    const gradient = 'linear-gradient(60deg,' + mainColor[0].getColor(.1) + ' 32%, ' + mainColor[1].getColor(.1) + ')';
    document.querySelector('.subtitle-detail').querySelector('div').style.backgroundImage = gradient;
  }
}
