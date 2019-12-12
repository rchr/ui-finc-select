import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';

describe('Application', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/finc-select');
  });

  it('renders', () => {
    expect(app.isPresent).to.be.true;
  });

  it('displays source-tab', () => {
    expect(app.navigationSourcesBtn).to.exist;
  });

  it('displays collection-tab', () => {
    expect(app.navigationCollectionBtn).to.exist;
  });

  it('displays filter-tab', () => {
    expect(app.navigationFilterBtn).to.exist;
  });
});
