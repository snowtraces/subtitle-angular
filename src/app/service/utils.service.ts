import {Injectable} from '@angular/core';
import {Color} from '../entity/color';
import {Lang} from '../entity/lang';
import {Movie} from '../entity/movie';
import {Subtitle} from '../entity/subtitle';
import {User} from '../entity/user';

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
   * @param type
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

  /**
   * 重新加载图片
   * @param event
   * @param count
   */
  imageReload(event: any, count: number = 0): void {
    let tail = '_=';
    let imageDom = event.target || event || {};
    let src = imageDom.src;
    if (count >= 1 || !src || src.endsWith(tail)) {
      imageDom.onerror = null;
      imageDom.src = './assets/poster/default/movie_default_small.webp';
    } else {
      setTimeout(function() {
        imageDom.src = src + '?' + Math.random() + tail;
      }, 500);
      imageDom.onerror = this.imageReload(imageDom, count + 1);
    }
  }

  private LOGIN_USER_CACHE_KEY = 'login_user_cache_key';
  private MOVIE_CACHE_KEY = 'key_movie_cache';
  private SUBTITLE_CACHE_KEY = 'key_subtitle_cache';
  private cache_config = {
    'login_user_cache_key': {
      max_size: 1,
      expired_time: 30 * 24 * 60 * 60 * 1000,
    },
    'key_movie_cache': {
      max_size: 100,
      expired_time: 30 * 24 * 60 * 60 * 1000,
    },
    'key_subtitle_cache': {
      max_size: 300,
      expired_time: 30 * 24 * 60 * 60 * 1000,
    },
  };

  /**
   * {data:{id:cache}, key:[], time: {id:inTime}}
   *
   * @param id
   * @param cacheKey
   */
  private getCache(id: string, cacheKey: string) {
    let cache = localStorage.getItem(cacheKey);
    if (!cache || cache === 'undefined') {
      return null;
    }
    cache = JSON.parse(cache) || {};

    // 检查时间是否过期，过期后删除本数据
    let lastUpdateTime = (cache['time'] || {})[id] || 0;
    let timePassed = new Date().getTime() - lastUpdateTime;
    if (timePassed > this.cache_config[cacheKey].expired_time) {
      let time = cache['time'] || {};
      let key = cache['key'] || [];
      let data = cache['data'] || {};

      // 1. 删除time
      delete time[id];
      cache['time'] = time;

      // 2. 删除key
      let keyIndex = key.indexOf(id);
      if (keyIndex !== -1) {
        key.splice(keyIndex, 1);
      }
      cache['key'] = key;

      // 3. 删除data
      delete data[id];
      cache['data'] = data;

      localStorage.setItem(cacheKey, JSON.stringify(cache));
      return null;
    }

    return (cache['data'] || {})[id];
  }

  /**
   * 设置本地缓存
   *
   * 超出数量后删除最旧数据
   * @param obj
   * @param cacheKey
   * @param idGetFun
   */
  private setCache(obj: Object, cacheKey: string, idGetFun: Function): void {
    let id = idGetFun ? idGetFun.call(null, obj) : obj['id'];
    let cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
    let key = cache['key'] || [];
    let time = cache['time'] || {};
    let data = cache['data'] || {};
    if (key.length === this.cache_config[cacheKey].max_size) {
      let deleteKey = key.shift();
      delete data[deleteKey];
    }

    key.push(id);
    cache['key'] = key;

    data[id] = obj;
    cache['data'] = data;

    time[id] = new Date().getTime();
    cache['time'] = time;

    localStorage.setItem(cacheKey, JSON.stringify(cache));
  }

  /**
   * 更新指定缓存
   * @param obj
   * @param cacheKey
   * @param idGetFun
   */
  private updateCache(obj: Object, cacheKey: string, idGetFun: Function): void {
    let id = idGetFun ? idGetFun.call(null, obj) : obj['id'];
    let cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
    let key = cache['key'] || [];
    if (key.indexOf(id) === -1) {
      return;
    }
    let data = cache['data'] || {};

    // 更新对象
    let cacheObj = data[id];
    for (let objKey in obj) {
      cacheObj[objKey] = obj[objKey];
    }

    data[id] = cacheObj;
    cache['data'] = data;

    localStorage.setItem(cacheKey, JSON.stringify(cache));
  }

  getMovieCache(id: string): Movie {
    return this.getCache(id, this.MOVIE_CACHE_KEY);
  }

  setMovieCache(movie: Movie): void {
    this.setCache(movie, this.MOVIE_CACHE_KEY, null);
  }

  getSubtitleCache(id: string): Subtitle {
    return this.getCache(id, this.SUBTITLE_CACHE_KEY);
  }

  setSubtitleCache(subtitle: Subtitle): void {
    this.setCache(subtitle, this.SUBTITLE_CACHE_KEY, null);
  }

  updateSubtitleCache(subtitle: { downloadTimes: number; id: string }): void {
    this.updateCache(subtitle, this.SUBTITLE_CACHE_KEY, null);
  }

  setLoginUserCache(user: User): void {
    localStorage.setItem(this.LOGIN_USER_CACHE_KEY, JSON.stringify(user));
  }

  getLoginUserCache(): User {
    const loginUser = localStorage.getItem(this.LOGIN_USER_CACHE_KEY);
    return loginUser ? JSON.parse(loginUser) : null;
  }
}
