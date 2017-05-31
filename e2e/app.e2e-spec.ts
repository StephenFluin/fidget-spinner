import { FidgetSpinnerPage } from './app.po';

describe('fidget-spinner App', () => {
  let page: FidgetSpinnerPage;

  beforeEach(() => {
    page = new FidgetSpinnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
