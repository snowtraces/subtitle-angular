import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Movie} from '../entity/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieSearch = 'api/searchMovies';
  private movieList = 'api/listMovies';
  private moviePath = 'api/movie';
  private moviePathBySubtitleId = 'api/movieBySubtitleId';
  private topMoviePath = 'api/listTopMovies';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /**
   * 关键词查询
   */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.movieSearch}?title=${term}`).pipe(
      tap(() => this.log(`found movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchHeroes', []))
    );
  }

  /**
   * 列表查询
   */
  getMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Movie[]>(this.movieList, {params})
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  getMovie(id: number): Observable<Movie> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<Movie>(this.moviePath, {params})
      .pipe(
        tap(() => this.log(`fetched movie id=${id}`)),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
  }


  getMovieBySubtitleId(subtitleId: string): Observable<Movie> {
    const params = new HttpParams().set('subtitleId', String(subtitleId));
    return this.http.get<Movie>(this.moviePathBySubtitleId, {params})
      .pipe(
        tap(() => this.log(`fetched movie subtitleId=${subtitleId}`)),
        catchError(this.handleError<Movie>(`getMovie subtitleId=${subtitleId}`))
      );
  }

  getTopMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.topMoviePath)
      .pipe(
        tap(() => this.log(`fetch top movies`)),
        catchError(this.handleError<Movie[]>(`getTopMovies`))
      );
  }

}
