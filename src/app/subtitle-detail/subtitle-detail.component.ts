import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Movie} from '../entity/movie';
import {Subtitle} from '../entity/subtitle';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../service/movie.service';
import {SubtitleService} from '../service/subtitle.service';
import {UtilsService} from '../service/utils.service';
import {SubtitleFile} from '../entity/subtitleFile';


@Component({
  selector: 'app-subtitle-detail',
  templateUrl: './subtitle-detail.component.html',
  styleUrls: ['./subtitle-detail.component.css']
})
export class SubtitleDetailComponent implements OnInit {
  subtitleId: string;
  movie: Movie;
  sub: Subtitle;
  subFiles: SubtitleFile[];

  showModal: boolean;
  downloaded: boolean;
  @ViewChild('fileModal', {static: false}) fileModal: ElementRef;
  @ViewChild('modelContent', {static: false}) modalContent: ElementRef;
  @ViewChild('subVersion', {static: false}) subVersion: ElementRef;
  @ViewChild('subBanner', {static: false}) subBanner: ElementRef;
  @ViewChild('subFile', {static: false}) subFile: ElementRef;
  @ViewChild('downloadBtn', {static: false}) downloadBtn: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private subtitleService: SubtitleService,
    public utils: UtilsService
  ) {
    this.showModal = false;
    this.downloaded = false;
  }

  public showFileModal(event, file: SubtitleFile) {
    this.showModal = true;
    this.modalContent.nativeElement.innerHTML = file.content || '该类型文件不支持预览';
  }

  public closeModal() {
    this.showModal = false;
  }

  public tryCloseModal(event) {
    if (this.showModal) {
      this.showModal = event.key !== 'Escape';
      this.showModal = event.target !== this.fileModal.nativeElement;
    }
  }

  ngOnInit() {
    this.subtitleId = (this.route.snapshot.paramMap.get('id'));
    this.getMovie();
    this.getSubtitleById();
    this.getSubtitleFile();
  }

  private getMovie(): void {
    const mid = this.route.snapshot.paramMap.get('mid');
    const movieCache = this.utils.getMovieCache(mid);
    if (movieCache) {
      this.movie = movieCache;
    } else {
      this.movieService.getMovie(Number(mid))
        .subscribe(movie => {
          this.movie = movie;
          this.utils.setMovieCache(movie);
        });
    }
  }

  private getSubtitleById(): void {
    const subCache = this.utils.getSubtitleCache(this.subtitleId);
    if (subCache) {
      this.sub = subCache;
    } else {
      this.subtitleService.getSubtitleById(this.subtitleId)
        .subscribe(subtitle => {
          this.sub = subtitle;
          this.utils.setSubtitleCache(subtitle);
        });
    }
  }

  private getSubtitleFile(): void {
    this.subtitleService.getSubtitleFileBySubId(this.subtitleId)
      .subscribe(subtitleFiles => this.subFiles = subtitleFiles);
  }

  setMainColor(): void {
    const img = document.querySelector('.info-poster').querySelector('img');
    const mainColor = this.utils.getMainColor(img);

    this.utils.setGradientBackground(mainColor[0].setOpacity(.1), mainColor[1].setOpacity(.1), '.movie-section');
    this.utils.setGradientBackground(mainColor[0].setOpacity(1), mainColor[1].setOpacity(1), 'span.se-info');
    this.subBanner.nativeElement.style.background = mainColor[0].getColor(1);
    this.subVersion.nativeElement.style.borderColor = mainColor[0].getColor(1);
    this.subVersion.nativeElement.style.background = mainColor[1].getColor(.1);
    // tslint:disable-next-line:no-unused-expression
    this.subFile && (this.subFile.nativeElement.style.borderColor = mainColor[0].getColor(1));
  }

  doDownload() {
    if (this.downloaded) {
      return;
    }
    this.subtitleService.doSubtitleDownload(this.subtitleId)
      .subscribe(result => {
        if (result) {
          this.downloaded = result;
          this.sub.downloadTimes = this.sub.downloadTimes + 1;
          this.downloadBtn.nativeElement.removeAttribute('href');
          this.downloadBtn.nativeElement.removeAttribute('download');
          this.downloadBtn.nativeElement.title = '字幕已下载';
          this.utils.updateSubtitleCache({id: this.subtitleId, downloadTimes: this.sub.downloadTimes});
        }
      });
  }
}
