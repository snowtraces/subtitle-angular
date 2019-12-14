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
  @ViewChild('fileModal', {static: false}) fileModal: ElementRef;
  @ViewChild('modelContent', {static: false}) modalContent: ElementRef;
  @ViewChild('subVersion', {static: false}) subVersion: ElementRef;
  @ViewChild('subBanner', {static: false}) subBanner: ElementRef;
  @ViewChild('subFile', {static: false}) subFile: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private subtitleService: SubtitleService,
    public utils: UtilsService
  ) {
    this.showModal = false;
  }

  public showFileModal(event, file: SubtitleFile) {
    this.showModal = true;
    this.modalContent.nativeElement.innerHTML = file.content;
  }

  public closeModal() {
    this.showModal = false;
  }

  public tryCloseModal(event) {
    if (this.showModal) {
      this.showModal = event.key !== 'Escape';
    }
  }

  ngOnInit() {
    this.subtitleId = (this.route.snapshot.paramMap.get('id'));
    this.getMovieBySubtitleId();
    this.getSubtitleById();
    this.getSubtitleFile();
  }

  private getMovieBySubtitleId(): void {
    this.movieService.getMovieBySubtitleId(this.subtitleId)
      .subscribe(movie => this.movie = movie);
  }

  private getSubtitleById(): void {
    this.subtitleService.getSubtitleById(this.subtitleId)
      .subscribe(subtitle => this.sub = subtitle);
  }

  private getSubtitleFile(): void {
    this.subtitleService.getSubtitleFileBySubId(this.subtitleId)
      .subscribe(subtitleFiles => {
        this.subFiles = subtitleFiles;
        console.log(subtitleFiles);
      });
  }

  setMainColor(): void {
    const img = document.querySelector('.info-poster').querySelector('img');
    const mainColor = this.utils.getMainColor(img);

    this.utils.setGradientBackground(mainColor[0].setOpacity(.1), mainColor[1].setOpacity(.1), '.movie-section');
    this.utils.setGradientBackground(mainColor[0].setOpacity(1), mainColor[1].setOpacity(1), 'span.se-info');
    this.subBanner.nativeElement.style.background = mainColor[0].getColor(1);
    this.subVersion.nativeElement.style.borderColor = mainColor[0].getColor(1);
    this.subVersion.nativeElement.style.background = mainColor[1].getColor(.1);
    this.subFile.nativeElement.style.borderColor = mainColor[0].getColor(1);
  }
}
