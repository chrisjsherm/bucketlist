import { BucketlistAppPage } from './app.po';

describe('bucketlist-app App', function() {
  let page: BucketlistAppPage;

  beforeEach(() => {
    page = new BucketlistAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
