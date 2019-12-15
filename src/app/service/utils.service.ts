import {Injectable} from '@angular/core';
import {Color} from '../entity/color';
import {Lang} from '../entity/lang';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

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
    let total = 0;
    while ((i += blockSize * 4) < length) {
      const rIndex = (data.data[i] - 128) >> 31;
      const gIndex = (data.data[i + 1] - 128) >> 31;
      const bIndex = (data.data[i + 2] - 128) >> 31;
      const index = ((rIndex + 1) << 2) + ((gIndex + 1) << 1) + (bIndex + 1);
      rgbArray[index].r += data.data[i];
      rgbArray[index].g += data.data[i + 1];
      rgbArray[index].b += data.data[i + 2];
      rgbArray[index].count++;
      total++;
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
      if (r <= 55 && g <= 55 && b <= 55) {
        // console.log(total, rgbArray[k].count, total / rgbArray[k].count)
        if (total / rgbArray[k].count >= 3) {
          continue;
        }
      }

      if (color.length === 1) {
        const isSimilar = this.colorIsSimilar(color[0], new Color(r, g, b, 1));
        if (isSimilar) {
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
    while (color.length < 2) {
      color.push(new Color(200, 200, 200, 1));
    }
    return color;
  }

  /**
   * 计算颜色距离
   */
  colorIsSimilar(colorA: Color, colorB: Color): boolean {
    const rmean = (colorA.r + colorB.r) / 2;
    const r = colorA.r - colorB.r;
    const g = colorA.g - colorB.g;
    const b = colorA.b - colorB.b;
    const distance = Math.sqrt((2 + rmean / 256) * r * r + 4 * g * g + (2 + (255 - rmean) / 256) * b * b);
    // const distance = (Math.abs(colorA.r - colorB.r)/255.0 + Math.abs(colorA.g - colorB.g)/255.0 + Math.abs(colorA.b - colorB.b)/255.0) / 3 * 100;
    // const distance = Math.sqrt(Math.pow(colorA.r - colorB.r, 2) + Math.pow(colorA.g - colorB.g, 2) + Math.pow(colorA.b - colorB.b, 2)) ;

    console.log(`%c ${colorA.getColor(1)} `, `background:${colorA.getColor(1)};color:#fff`);
    console.log(`%c ${colorB.getColor(1)} `, `background:${colorB.getColor(1)};color:#fff`);
    console.log('相似度：' + distance);
    return distance < 180;
  }

  /**
   * 设置背景渐变色
   * @param begin
   * @param end
   * @param selector
   */
  setGradientBackground(begin: Color, end: Color, selector: string): void {
    let gradient = `linear-gradient(60deg, ${begin.getColor(0)} 32%, ${end.getColor(0)} )`;
    let target = document.querySelector(selector);
    if (target) {
      // @ts-ignore
      target.style.backgroundImage = gradient;
    }
  }

  /**
   * 语言格式化
   * @param language
   */
  normalizeLang(language: string): Lang[] {
    const result = [];
    const langArr = language.split('');
    for (let i = 9; i >= 0; i--) {
      if (langArr[i] === '0') {
        continue;
      }
      switch (i) {
        case 9:
          result.push(new Lang(i, '简体'));
          break;
        case 8:
          result.push(new Lang(i, '繁体'));
          break;
        case 7:
          result.push(new Lang(i, '英语'));
          break;
        case 6:
          result.push(new Lang(i, '日语'));
          break;
        case 5:
          result.push(new Lang(i, '韩语'));
          break;
        case 4:
          result.push(new Lang(i, '法语'));
          break;
        case 3:
          result.push(new Lang(i, '德语'));
          break;
        default:
          result.push(new Lang(i, '其他'));
          break;
      }
    }
    return result;
  }

  /**
   * 语言格式化
   * @param language
   */
  normalizeType(type: number): string {
    switch (type) {
      case 1:
        return '翻译';
      case 2:
        return '官方译本';
      case 3:
        return '听译';
      case 4:
        return '机翻';
      default:
        return null;
    }
  }

}
