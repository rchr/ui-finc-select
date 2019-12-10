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

  // it('type select is available', () => {
  //   expect(editFilterPage.typeSelect.value).to.be.equal('');
  // });

  // describe('type can be selected', () => {
  //   beforeEach(async () => {
  //     await editFilterPage.typeSelect.select('Whitelist');
  //   });

  //   it('type is changed to "Whitelist"', () => {
  //     expect(editFilterPage.typeSelect.value).to.be.equal('Whitelist');
  //   });
  // });

  // describe('type can be changed', () => {
  //   beforeEach(async () => {
  //     await editFilterPage.typeSelect.select('Whitelist');
  //     await editFilterPage.typeSelect.select('Blacklist');
  //   });

  //   it('type is changed to Blacklist', () => {
  //     expect(editFilterPage.typeSelect.value).to.be.equal('Blacklist');
  //   });
  // });

  // describe('add filter file', () => {
  //   beforeEach(async () => {
  //     await editFilterPage.addFilterFileBtn.click();
  //   });

  //   it('filter file card and upload button are present', () => {
  //     expect(editFilterPage.filterFileCardIsPresent).to.be.true;
  //     expect(editFilterPage.uploadFilterFileBtnIsPresent).to.be.true;
  //   });
  // });

  // describe('close filter form', () => {
  //   beforeEach(async function () {
  //     await editFilterPage.closePane.click();
  //   });

  //   it('closes filter form', () => {
  //     expect(editFilterPage.isPresent).to.be.false;
  //     expect(filterInteractor.isPresent).to.be.true;
  //   });
  // });
});
