import { CygniHomeTaskPage } from './app.po';

describe('cygni-home-task App', () => {
  let page: CygniHomeTaskPage;

  beforeEach(() => {
    page = new CygniHomeTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
