import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import FilterDetailsPage from '../interactors/filter-details-page';
import FiltersList from '../interactors/filters-list';

describe('Filter Details', () => {
  setupApplication();
  const filterDetailsPage = new FilterDetailsPage();
  const filtersList = new FiltersList();

  let filter = null;

  beforeEach(async function () {
    filter = this.server.create('finc-select-filter', 'withFilterFile');
    await this.visit('/finc-select/filters?filters=type.Whitelist');
  });

  it('shows the list of filter items', () => {
    expect(filtersList.isVisible).to.equal(true);
  });

  it('renders each filter-instance', () => {
    expect(filtersList.instances().length).to.be.gte(1);
  });

  describe('clicking on the first filter', function () {
    beforeEach(async function () {
      await filtersList.instances(0).click();
    });

    it('filter details should be visible', function () {
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
      await filterDetailsPage.closePaneBtn.click();
    });

    it('filter details should not be visible', () => {
      expect(filterDetailsPage.isPresent).to.be.false;
    });
  });

  describe('open filter-file accordion', () => {
    beforeEach(async function () {
      await filterDetailsPage.fileAccordion.click();
    });
    it('download button should be visible', () => {
      expect(filterDetailsPage.downloadFileBtn.isPresent).to.equal(true);
    });
  });
});
