import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';

describe('Application', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/finc-select');
  });

  it('app should be present', () => {
    expect(app.isPresent).to.be.true;
  });

  it('source-tab should be visible', () => {
    expect(app.navigationSourcesBtn).to.exist;
  });

  it('collection-tab should be visible', () => {
    expect(app.navigationCollectionBtn).to.exist;
  });

  it('filter-tab should be visible', () => {
    expect(app.navigationFilterBtn).to.exist;
  });
});
