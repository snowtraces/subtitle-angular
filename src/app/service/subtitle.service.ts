import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Subtitle} from '../entity/subtitle';
import {SubtitleFile} from '../entity/subtitleFile';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private subListPath = 'api/listSubtitles';
  private subtitlePath = 'api/getSubtitleById';
  private subtitleFilePath = 'api/listSubtitleFile';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private log(message: string) {
    this.messageService.add(`SubtitleService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getSubtitles(id: number): Observable<Subtitle[]> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<Subtitle[]>(this.subListPath, {params})
      .pipe(
        tap(() => this.log(`fetched subtitles id=${id}`)),
        catchError(this.handleError<Subtitle[]>(`getSubtitles id=${id}`))
      );
  }

  getSubtitleById(subtitleId: string): Observable<Subtitle> {
    const params = new HttpParams().set('id', String(subtitleId));
    return this.http.get<Subtitle>(this.subtitlePath, {params})
      .pipe(
        tap(() => this.log(`fetched subtitle subtitleId=${subtitleId}`)),
        catchError(this.handleError<Subtitle>(`getSubtitle subtitleId=${subtitleId}`))
      );
  }

  getSubtitleFileBySubId(subtitleId: string): Observable<SubtitleFile[]> {
    const params = new HttpParams().set('subtitleId', String(subtitleId));
    return this.http.get<SubtitleFile[]>(this.subtitleFilePath, {params})
      .pipe(
        tap(() => this.log(`fetched subtitleFile subtitleId=${subtitleId}`)),
        catchError(this.handleError<SubtitleFile[]>(`getSubtitleFile subtitleId=${subtitleId}`))
      );
  }
}
