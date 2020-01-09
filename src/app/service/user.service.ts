import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {User} from '../entity/user';
import {PageResp} from '../entity/pageResp';
import {catchError, tap} from 'rxjs/operators';
import {Resp} from '../entity/resp';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  private log(message: string) {
    this.messageService.add(`logService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  list4Page(sort: string, order: string, page: number, filterValue): Observable<PageResp<User>> {
    const href = 'api/user/list';
    const requestUrl =
      `${href}?${filterValue ? `filter=${filterValue}&` : ''}order=${order}&pageIndex=${page + 1}`;

    return this.http.get<PageResp<User>>(requestUrl)
      .pipe(
        tap<any>(() => this.log(`user list4Page sort=${sort}, order=${order}, pageIndex=${page}, filter=${filterValue}`)),
        catchError(this.handleError<Resp>(`user list4Page sort=${sort}, order=${order}, pageIndex=${page}, filter=${filterValue}`))
      );
  }

  changeStatus(status: boolean, id: string): Observable<Resp> {
    const href = 'api/user/changeStatus';
    return this.http.post<Resp>(href, {status: status === true ? 0 : 1, id})
      .pipe(
        tap<any>(() => this.log(`user changeStatus id=${id}, changeTo=${status}`)),
        catchError(this.handleError<Resp>(`user changeStatus id=${id}, changeTo=${status}`))
      );
  }

}
