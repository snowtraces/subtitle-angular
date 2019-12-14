export class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  count = 0;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getColor(opacity: number): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity || this.a || 1})`;
  }

  setOpacity(opacity: number): Color {
    this.a = opacity;
    return this;
  }
}
