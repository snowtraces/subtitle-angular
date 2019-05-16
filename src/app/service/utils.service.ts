import { Injectable } from '@angular/core';
import {Color} from '../entity/color';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * 将id转换成路径
   */
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

  /* tslint:disable */
  /**
   * 获取图片主要两种颜色
   */
  getMainColor(img: HTMLImageElement): Color[] {
    const color = [];
    const blockSize = 47;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const rgbArray = [];
    for (let j = 0; j < 8; j++) {
      rgbArray[j] = new Color(0, 0, 0, 0);
    }
    if (!context) {
      return;
    }
    const height = canvas.height = img.naturalHeight;
    const width = canvas.width = img.naturalWidth;
    context.drawImage(img, 0, 0);
    const data = context.getImageData(0, 0, width, height);
    const length = data.data.length;
    let i = -4;
    while ((i += blockSize * 4) < length) {
      const rIndex = (data.data[i] - 128) >> 31;
      const gIndex = (data.data[i + 1] - 128) >> 31;
      const bIndex = (data.data[i + 2] - 128) >> 31;
      const index = ((rIndex + 1) << 2) + ((gIndex + 1) << 1) + (bIndex + 1);
      rgbArray[index].r += data.data[i];
      rgbArray[index].g += data.data[i + 1];
      rgbArray[index].b += data.data[i + 2];
      rgbArray[index].count++;
    }
    // 按颜色多少排序
    rgbArray.sort((a, b) => b.count - a.count);
    let numCount = 0;
    for (let k = 0; k < 8; k++) {
      const r = Math.round(rgbArray[k].r / rgbArray[k].count) || 0;
      const b = Math.round(rgbArray[k].b / rgbArray[k].count) || 0;
      const g = Math.round(rgbArray[k].g / rgbArray[k].count) || 0;
      if (r >= 200 && g >= 200 && b >= 200) {
        continue;
      }
      if (color.length === 1) {
        const distance = this.colorDistance(color[0], new Color(r, g, b, 1));
        if (distance < 180) {
          continue;
        }
      }
      color.push(new Color(r, g, b, 1));
      numCount++;
      if (numCount === 2) {
        // 按颜色深浅排序
        color.sort((cA, cB) => cA.r + cA.g + cA.b - cB.r - cB.g - cB.b);
        return color;
      }
    }
  }

  /**
   * 计算颜色距离
   */
  colorDistance(colorA: Color, colorB: Color): number {
    const rmean = (colorA.r + colorB.r) / 2;
    const r = colorA.r - colorB.r;
    const g = colorA.g - colorB.g;
    const b = colorA.b - colorB.b;
    const distance = Math.sqrt((2 + rmean / 256) * r * r + 4 * g * g + (2 + (255 - rmean) / 256) * b * b);
    console.log(colorA, colorB, distance)
    return distance;
  }
}
