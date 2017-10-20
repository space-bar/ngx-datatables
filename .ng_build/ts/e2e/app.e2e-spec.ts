import { NgxDatatablesPage } from './app.po';

describe('ngx-datatables App', () => {
  let page: NgxDatatablesPage;

  beforeEach(() => {
    page = new NgxDatatablesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
