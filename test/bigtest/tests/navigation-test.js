import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';
import SourceInteractor from '../interactors/source';
import FilterInteractor from '../interactors/filter';
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
      const filterInteractor = new FilterInteractor();

      beforeEach(async function () {
        await app.navigation.filterNavBtn.click();
        await filterInteractor.whenLoaded();
      });

      it('should open the filter list', () => {
        expect(filterInteractor.isPresent).to.be.true;
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
      const sourceInteractor = new SourceInteractor();

      beforeEach(async function () {
        await app.navigation.sourceNavBtn.click();
        await sourceInteractor.whenLoaded();
      });

      it('should open the sources list', () => {
        expect(sourceInteractor.isPresent).to.be.true;
      });

      it('source tab should be primary', () => {
        expect(app.navigation.sourceNavBtn.isPrimary).to.be.true;
        expect(app.navigation.collectionNavBtn.isPrimary).to.be.false;
        expect(app.navigation.filterNavBtn.isPrimary).to.be.false;
      });
    });
  });
});
