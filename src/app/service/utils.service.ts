import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  idPath(id: string, imgId: string): string {
    if (!imgId || imgId.includes('default')) {
      return 'default';
    }
    return this.idPathBasic(id);
  }
  idPathBasic(id: string): string {
    const len = 1;
    const steps = 5;
    const path = [];
    for (let i = 0; i < steps; i++) {
      path.push(id.substring(i * len, (i + 1) * len));
    }
    return path.join('/');
  }
}
