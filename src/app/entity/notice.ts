export class Notice {
  highLight: boolean;
  content: string;

  constructor(content: string, highLight = false) {
    this.highLight = highLight;
    this.content = content;
  }
}
