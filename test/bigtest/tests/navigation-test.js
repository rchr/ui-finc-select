import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';
import SourcesList from '../interactors/sources-list';
import FiltersList from '../interactors/filters-list';
import CollectionsList from '../interactors/collections-list';

describe('Navigation', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  describe('open default tab', () => {
    beforeEach(async function () {
      this.visit('/finc-select/metadata-sources?filters=status.active');
    });

    it('navigation should be present', () => {
      expect(app.navigation.isPresent).to.be.true;
    });

    describe('click on Filter Tab', () => {
      const filtersList = new FiltersList();

      beforeEach(async function () {
        await app.navigation.filterNavBtn.click();
        await filtersList.whenLoaded();
      });

      it('should open the filter list', () => {
        expect(filtersList.isPresent).to.be.true;
      });

      it('filter tab should be primary', () => {
        expect(app.navigation.sourceNavBtn.isPrimary).to.be.false;
        expect(app.navigation.collectionNavBtn.isPrimary).to.be.false;
        expect(app.navigation.filterNavBtn.isPrimary).to.be.true;
      });
    });

    describe('click on Collection Tab', () => {
      const collectionsList = new CollectionsList();

      beforeEach(async function () {
        await app.navigation.collectionNavBtn.click();
        await collectionsList.whenLoaded();
      });

      it('should open the collections list', () => {
        expect(collectionsList.isPresent).to.be.true;
      });

      it('collection tab should be primary', () => {
        expect(app.navigation.sourceNavBtn.isPrimary).to.be.false;
        expect(app.navigation.collectionNavBtn.isPrimary).to.be.true;
        expect(app.navigation.filterNavBtn.isPrimary).to.be.false;
      });
    });

    describe('click on Source Tab', () => {
      const sourcesList = new SourcesList();

      beforeEach(async function () {
        await app.navigation.sourceNavBtn.click();
        await sourcesList.whenLoaded();
      });

      it('should open the sources list', () => {
        expect(sourcesList.isPresent).to.be.true;
      });

      it('source tab should be primary', () => {
        expect(app.navigation.sourceNavBtn.isPrimary).to.be.true;
        expect(app.navigation.collectionNavBtn.isPrimary).to.be.false;
        expect(app.navigation.filterNavBtn.isPrimary).to.be.false;
      });
    });
  });
});
