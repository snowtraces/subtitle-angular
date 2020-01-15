import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../entity/user';
import {Resp} from '../entity/resp';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginPath = 'api/login';
  private autoLoginPath = 'api/autoLogin';
  private signUpPath = 'api/signUp';

  loginUser: User;

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

  login(name: string, password: string): Observable<Resp<User>> {
    return this.http.post<User>(`${this.loginPath}`, {name, password})
      .pipe(
        tap<any>(() => this.log(`login name=${name}, password=${password}`)),
        catchError(this.handleError<Resp<User>>(`login name=${name}, password=${password}`))
      );
  }

  autoLogin(): Observable<Resp<User>> {
    return this.http.post<User>(`${this.autoLoginPath}`, null)
      .pipe(
        tap<any>(() => this.log(`autoLogin`)),
        catchError(this.handleError<Resp<User>>(`autoLogin`))
      );
  }

  signUp(name: string, password: string): Observable<Resp> {
    return this.http.post<User>(`${this.signUpPath}`, {name, password})
      .pipe(
        tap<any>(() => this.log(`signUp name=${name}, password=${password}`)),
        catchError(this.handleError<Resp>(`signUp name=${name}, password=${password}`))
      );
  }
}
