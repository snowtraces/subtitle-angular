import { SafeHtmlPipePipe } from './safe-html-pipe.pipe';

describe('SafeHtmlPipePipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new SafeHtmlPipePipe();
    expect(pipe).toBeTruthy();
  });
});
