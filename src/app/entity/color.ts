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

  getColor(): string {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}
