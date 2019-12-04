import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import FilterDetailsPage from '../interactors/filter-details-page';
import FilterInteractor from '../interactors/filter';

describe('FilterDetailsPage', () => {
  setupApplication();
  const filterDetailsPage = new FilterDetailsPage();
  const filterInteractor = new FilterInteractor();

  let collection = null;

  beforeEach(async function () {
    collection = this.server.create('finc-select-filter');
    await this.visit('/finc-select/filters?filters=type.Whitelist');
  });

  it('shows the list of filter items', () => {
    expect(filterInteractor.isVisible).to.equal(true);
  });

  it('renders each filter-instance', () => {
    expect(filterInteractor.instances().length).to.be.gte(1);
  });

  describe('clicking on the first filter', function () {
    beforeEach(async function () {
      await filterInteractor.instances(0).click();
    });

    it('loads the filter-instance details', function () {
      expect(filterDetailsPage.isVisible).to.equal(true);
    });

    it('displays filter label in the pane header', function () {
      expect(filterDetailsPage.title).to.include(collection.label);
    });

    it('all accordions in filter-instance are present', function () {
      expect(filterDetailsPage.fileAccordion.isPresent).to.equal(true);
    });
  });
});
