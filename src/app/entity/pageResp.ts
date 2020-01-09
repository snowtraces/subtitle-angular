import {Resp} from './resp';

export class PageResp<T> extends Resp {
  rows: T[];
  total: number;
}
