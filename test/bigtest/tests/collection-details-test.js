import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionDetailsPage from '../interactors/collection-details-page';
import CollectionsList from '../interactors/collections-list';

describe('CollectionDetailsPage', () => {
  setupApplication();
  const collectionDetailsPage = new CollectionDetailsPage();
  const collectionsList = new CollectionsList();

  let collection = null;

  beforeEach(async function () {
    collection = this.server.create('finc-select-metadata-collection');
    await this.visit('/finc-select/metadata-collections?filters=permitted.yes');
  });

  it('shows the list of collection items', () => {
    expect(collectionsList.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionsList.instances().length).to.be.gte(1);
  });

  describe('clicking on the first collection', function () {
    beforeEach(async function () {
      await collectionsList.instances(0).click();
    });

    it('loads the collection-instance details', function () {
      expect(collectionDetailsPage.isVisible).to.equal(true);
    });

    it('displays collection label in the pane header', function () {
      expect(collectionDetailsPage.collectionTitle).to.include(collection.label);
    });

    it('all accordions in collection-instance should be present', function () {
      expect(collectionDetailsPage.contentAccordion.isPresent).to.equal(true);
      expect(collectionDetailsPage.technicalAccordion.isPresent).to.equal(true);
    });
  });

  describe('close collection details pane', () => {
    beforeEach(async function () {
      await collectionDetailsPage.closeCollectionDetailsBtn.click();
    });

    it('collection details pane is not presented', () => {
      expect(collectionDetailsPage.isPresent).to.be.false;
    });
  });
});
