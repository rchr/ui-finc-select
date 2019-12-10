import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditFilterPage from '../interactors/filter-edit-page';
import FilterDetailsPage from '../interactors/filter-details-page';
import FilterInteractor from '../interactors/filter';

describe('Create Filter', () => {
  setupApplication();
  const filterInteractor = new FilterInteractor();
  const filterDetailsPage = new FilterDetailsPage();
  const editFilterPage = new EditFilterPage();

  beforeEach(async function () {
    // const filter = this.server.create('finc-select-filter', 'withFilterFile');
    this.visit('/finc-select/filters?filters=type.Whitelist');
    await filterInteractor.whenLoaded();
  });

  it('shows filter details pane', () => {
    expect(filterInteractor.isPresent).to.be.true;
  });

  describe('click on add new filter button', () => {
    beforeEach(async function () {
      await filterInteractor.addNewFilterBtn.click();
    });

    it('open add new filter modal', () => {
      expect(editFilterPage.isPresent).to.be.true;
    });

    describe('update create filter form', () => {
      const TEST_NAME = 'Filter test name';
      const TEST_TYPE = 'Whitelist';

      beforeEach(async function () {
        await editFilterPage.filterName.fill(TEST_NAME);
        await editFilterPage.typeSelect.select(TEST_TYPE);
        await editFilterPage.createNewFilterBtn.click();
      });

      it('filter details view should be open and create filter form should be closed', () => {
        expect(filterDetailsPage.isPresent).to.be.true;
        expect(editFilterPage.isPresent).to.be.false;
      });
    });

    describe('click cancel in create new filter form', () => {
      beforeEach(async function () {
        await editFilterPage.closeEditPaneBtn.click();
      });

      it('filter edit form should be closed', () => {
        expect(editFilterPage.isPresent).to.be.false;
      });
    });
  });
});
