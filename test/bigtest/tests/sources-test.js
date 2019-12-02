import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SourceInteractor from '../interactors/source';
import CollectionInteractor from '../interactors/collection';

const SOURCE_COUNT = 25;

describe('Metadata Source', () => {
  setupApplication();

  const sourceInteractor = new SourceInteractor();

  beforeEach(async function () {
    this.server.createList('finc-select-metadata-source', SOURCE_COUNT);
    this.visit('/finc-select/metadata-sources?filters=status.active');
    await sourceInteractor.whenLoaded();
  });

  it('shows the list of source items', () => {
    expect(sourceInteractor.isVisible).to.equal(true);
  });

  it('renders each source-instance', () => {
    expect(sourceInteractor.instances().length).to.be.equal(SOURCE_COUNT);
  });

  describe('clicking on the first source', function () {
    beforeEach(async function () {
      await sourceInteractor.instances(0).click();
    });

    it('loads the source-instance details', function () {
      expect(sourceInteractor.instance.isVisible).to.equal(true);
    });
  });

  describe('Navigation with active source tab', () => {
    it('should be present', () => {
      expect(sourceInteractor.navigation.isPresent).to.be.true;
    });

    it('should make source tab primary', () => {
      expect(sourceInteractor.navigation.sourceNavBtn.isPrimary).to.be.true;
      expect(sourceInteractor.navigation.collectionNavBtn.isPrimary).to.be.false;
    });

    describe('click on Collection Tab', () => {
      const collectionInteractor = new CollectionInteractor();

      beforeEach(async function () {
        await sourceInteractor.navigation.collectionNavBtn.click();
        await collectionInteractor.whenLoaded();
      });

      it('should open the collections list', () => {
        expect(collectionInteractor.isPresent).to.be.true;
      });
    });
  });
});
