import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionInteractor from '../interactors/collection';
import SourceInteractor from '../interactors/source';
import FilterInteractor from '../interactors/filter';

const COLLECTION_COUNT = 25;
const TINY_SOURCE_COUNT = 5;

describe('Metadata Collection', () => {
  setupApplication();

  const collectionInteractor = new CollectionInteractor();

  beforeEach(async function () {
    this.server.createList('tiny-metadata-source', TINY_SOURCE_COUNT);
    this.server.createList('finc-select-metadata-collection', COLLECTION_COUNT);
    this.visit('/finc-select/metadata-collections?filters=freeContent.yes');
    await collectionInteractor.whenLoaded();
  });

  it('shows the list of collection items', () => {
    expect(collectionInteractor.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionInteractor.instances().length).to.be.equal(COLLECTION_COUNT);
  });

  // describe('clicking on the first collection', function () {
  //   beforeEach(async function () {
  //     await collectionInteractor.instances(0).click();
  //   });

  //   it('loads the collection-instance details', function () {
  //     expect(collectionInteractor.instance.isVisible).to.equal(true);
  //   });
  // });

  describe('Navigation with active collection tab', () => {
    it('should be present', () => {
      expect(collectionInteractor.navigation.isPresent).to.be.true;
    });

    it('should make collection tab primary', () => {
      expect(collectionInteractor.navigation.collectionNavBtn.isPrimary).to.be.true;
      expect(collectionInteractor.navigation.sourceNavBtn.isPrimary).to.be.false;
    });

    describe('click on Source Tab', () => {
      const sourceInteractor = new SourceInteractor();

      beforeEach(async function () {
        await collectionInteractor.navigation.sourceNavBtn.click();
        await sourceInteractor.whenLoaded();
      });

      it('should open the sources list', () => {
        expect(sourceInteractor.isPresent).to.be.true;
      });
    });

    describe('click on Filter Tab', () => {
      const filterInteractor = new FilterInteractor();

      beforeEach(async function () {
        await collectionInteractor.navigation.filterNavBtn.click();
        await filterInteractor.whenLoaded();
      });

      it('should open the filter list', () => {
        expect(filterInteractor.isPresent).to.be.true;
      });
    });
  });
});
