import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionsList from '../interactors/collections-list';

const COLLECTION_COUNT = 25;
const TINY_SOURCE_COUNT = 5;

describe('Collections List', () => {
  setupApplication();

  const collectionsList = new CollectionsList();

  beforeEach(async function () {
    this.server.createList('tiny-metadata-source', TINY_SOURCE_COUNT);
    this.server.createList('finc-select-metadata-collection', COLLECTION_COUNT);
    this.visit('/finc-select/metadata-collections?filters=freeContent.yes');
    await collectionsList.whenLoaded();
  });

  it('shows the list of collection items', () => {
    expect(collectionsList.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionsList.instances().length).to.be.equal(COLLECTION_COUNT);
  });

  describe('check the collection filter elements', function () {
    it('mdSource filter should be present', () => {
      expect(collectionsList.mdSourceFilterIsPresent).to.be.true;
    });

    it('freeContent filter should be present', () => {
      expect(collectionsList.freeContentFilterIsPresent).to.be.true;
    });

    it('permitted filter should be present', () => {
      expect(collectionsList.permittedFilterIsPresent).to.be.true;
    });

    it('selected filter should be present', () => {
      expect(collectionsList.selectedFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(collectionsList.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(collectionsList.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(collectionsList.searchFieldIsPresent).to.be.true;
    });
  });
});
