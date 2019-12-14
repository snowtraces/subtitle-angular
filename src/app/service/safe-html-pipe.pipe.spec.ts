import { SafeHtmlPipe } from './safe-html-pipe.pipe';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new SafeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
