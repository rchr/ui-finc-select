import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SourceInteractor from '../interactors/source';

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

  describe('check the source filter elements', function () {
    it('status filter should be present', () => {
      expect(sourceInteractor.statusFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(sourceInteractor.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(sourceInteractor.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(sourceInteractor.searchFieldIsPresent).to.be.true;
    });
  });
});
