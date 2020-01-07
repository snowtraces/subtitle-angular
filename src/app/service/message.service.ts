import {Injectable} from '@angular/core';
import {Notice} from '../entity/notice';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  notice: Notice;

  add(message: string) {
    this.messages.push(message);
  }

  addNotice(notice: Notice) {
    this.notice = notice;
    setTimeout(() => this.notice = null, 2000);
  }

  clear() {
    this.messages = [];
  }
}
