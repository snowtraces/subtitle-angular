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

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
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
      tap(_ => this.log(`found movies matching "${term}"`)),
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
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  getMovie(id: number): Observable<Movie> {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<Movie>(this.moviePath, {params})
      .pipe(
        tap(_ => this.log(`fetched movie id=${id}`)),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
  }
}
