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
    if (this.timeOutHandler) {
      clearTimeout(this.timeOutHandler);
      this.timeOutHandler = null;
      this.notice = null;
    }

    this.notice = notice;
    this.timeOutHandler = setTimeout(() => this.notice = null, notice.highLight ? 2000 : 800);
  }

  clear() {
    this.messages = [];
  }
}
