import {Resp} from './resp';

export class PageResp<T> extends Resp<any> {
  rows: T[];
  total: number;
}
