import {Injectable} from '@angular/core';
import {Notice} from '../entity/notice';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  notice: Notice;
  timeOutHandler: any;

  add(message: string) {
    this.messages.push(message);
  }

  addNotice(notice: Notice) {
    this.notice = notice;
    clearTimeout(this.timeOutHandler);
    this.timeOutHandler = setTimeout(() => this.notice = null, notice.highLight ? 2000 : 800);
  }

  clear() {
    this.messages = [];
  }
}
