import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import FiltersList from '../interactors/filters-list';

const FILTER_COUNT = 25;

describe('Filters List', () => {
  setupApplication();

  const filtersList = new FiltersList();

  beforeEach(async function () {
    this.server.createList('finc-select-filter', FILTER_COUNT);
    this.visit('/finc-select/filters?filters=type.Whitelist');
    await filtersList.whenLoaded();
  });

  it('shows the list of filter items', () => {
    expect(filtersList.isVisible).to.equal(true);
  });

  it('renders each filter-instance', () => {
    expect(filtersList.instances().length).to.be.equal(FILTER_COUNT);
  });

  describe('check the filter elements', function () {
    it('type filter should be present', () => {
      expect(filtersList.typeFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(filtersList.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(filtersList.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(filtersList.searchFieldIsPresent).to.be.true;
    });
  });
});
