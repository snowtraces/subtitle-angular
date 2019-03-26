import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`FileService: ${message}`);
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

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('api/fileUpload', formData,
      { headers: {filename: 'uFile', enctype: 'multipart/form-data'}
        , reportProgress: true}).pipe(
      tap(_ => this.log(`upload file: ${fileToUpload.name}`)),
      catchError(this.handleError<any>(`upload file: ${fileToUpload.name}`, []))
    );;
  }
}
