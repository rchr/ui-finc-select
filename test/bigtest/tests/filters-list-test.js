import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import FilterInteractor from '../interactors/filter';

const FILTER_COUNT = 25;

describe('Filter', () => {
  setupApplication();

  const filterInteractor = new FilterInteractor();

  beforeEach(async function () {
    this.server.createList('finc-select-filter', FILTER_COUNT);
    this.visit('/finc-select/filters?filters=type.Whitelist');
    await filterInteractor.whenLoaded();
  });

  it('shows the list of filter items', () => {
    expect(filterInteractor.isVisible).to.equal(true);
  });

  it('renders each filter-instance', () => {
    expect(filterInteractor.instances().length).to.be.equal(FILTER_COUNT);
  });

  describe('check the filter elements', function () {
    it('type filter should be present', () => {
      expect(filterInteractor.typeFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(filterInteractor.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(filterInteractor.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(filterInteractor.searchFieldIsPresent).to.be.true;
    });
  });
});
