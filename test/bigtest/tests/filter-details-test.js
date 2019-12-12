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

  let filter = null;

  beforeEach(async function () {
    filter = this.server.create('finc-select-filter', 'withFilterFile');
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
      expect(filterDetailsPage.filterTitle).to.include(filter.label); // 'FILTER 0'
    });

    it('all accordions in filter-instance are present', function () {
      expect(filterDetailsPage.fileAccordion.isPresent).to.equal(true);
    });
  });

  describe('close filter details pane', () => {
    beforeEach(async function () {
      await filterDetailsPage.closeFilterDetailsBtn.click();
    });

    it('filter details pane is not presented', () => {
      expect(filterDetailsPage.isPresent).to.be.false;
    });
  });

  describe('can open file accordion', () => {
    beforeEach(async function () {
      await filterDetailsPage.fileAccordion.click();
    });
    it('download button is present', () => {
      expect(filterDetailsPage.downloadFileBtn.isPresent).to.equal(true);
    });
  });
});
