import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import FilterInteractor from '../interactors/filter';
import SourceInteractor from '../interactors/source';
import CollectionInteractor from '../interactors/collection';

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

  describe('Navigation with active filter tab', () => {
    it('should be present', () => {
      expect(filterInteractor.navigation.isPresent).to.be.true;
    });

    it('should make filter tab primary', () => {
      expect(filterInteractor.navigation.sourceNavBtn.isPrimary).to.be.false;
      expect(filterInteractor.navigation.collectionNavBtn.isPrimary).to.be.false;
      expect(filterInteractor.navigation.filterNavBtn.isPrimary).to.be.true;
    });

    describe('click on Source Tab', () => {
      const sourceInteractor = new SourceInteractor();

      beforeEach(async function () {
        await filterInteractor.navigation.sourceNavBtn.click();
        await sourceInteractor.whenLoaded();
      });

      it('should open the source list', () => {
        expect(sourceInteractor.isPresent).to.be.true;
      });
    });

    describe('click on Collection Tab', () => {
      const collectionInteractor = new CollectionInteractor();

      beforeEach(async function () {
        await filterInteractor.navigation.collectionNavBtn.click();
        await collectionInteractor.whenLoaded();
      });

      it('should open the collections list', () => {
        expect(collectionInteractor.isPresent).to.be.true;
      });
    });
  });
});
