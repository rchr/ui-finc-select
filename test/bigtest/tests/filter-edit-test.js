import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditFilterPage from '../interactors/filter-edit-page';
import FilterInteractor from '../interactors/filter';
import FilterDetailsPage from '../interactors/filter-details-page';

describe('Edit Filter', () => {
  setupApplication();
  const filterInteractor = new FilterInteractor();
  const filterDetailsPage = new FilterDetailsPage();
  const editFilterPage = new EditFilterPage();

  beforeEach(async function () {
    const filter = this.server.create('finc-select-filter');

    this.visit(`/finc-select/filters/${filter.id}?filters=type.Whitelist`);
    await filterInteractor.whenLoaded();
    await filterDetailsPage.clickEditButton.click();
    await editFilterPage.whenLoaded();
  });

  it('filter edit form should be open', () => {
    expect(editFilterPage.isPresent).to.be.true;
  });

  it('type select is available', () => {
    expect(editFilterPage.typeSelect.value).to.be.equal('');
  });

  describe('type can be selected', () => {
    beforeEach(async () => {
      await editFilterPage.typeSelect.select('Whitelist');
    });

    it('type is changed to "Whitelist"', () => {
      expect(editFilterPage.typeSelect.value).to.be.equal('Whitelist');
    });
  });

  describe('type can be changed', () => {
    beforeEach(async () => {
      await editFilterPage.typeSelect.select('Whitelist');
      await editFilterPage.typeSelect.select('Blacklist');
    });

    it('type is changed to Blacklist', () => {
      expect(editFilterPage.typeSelect.value).to.be.equal('Blacklist');
    });
  });

  describe('add filter file', () => {
    beforeEach(async () => {
      await editFilterPage.addFilterFileBtn.click();
    });

    it('filter file card and upload button are present', () => {
      expect(editFilterPage.filterFileCardIsPresent).to.be.true;
      expect(editFilterPage.uploadFilterFileBtnIsPresent).to.be.true;
    });
  });

  describe('close filter form', () => {
    beforeEach(async function () {
      await editFilterPage.closePane.click();
    });

    it('closes filter form', () => {
      expect(editFilterPage.isPresent).to.be.false;
      expect(filterInteractor.isPresent).to.be.true;
    });
  });

  describe('change and save filter edit form', () => {
    beforeEach(async function () {
      await editFilterPage.typeSelect.select('Blacklist');
      await editFilterPage.updateFilterBtn.click();
    });

    it('filter form is still presented, since validation errors', () => {
      expect(editFilterPage.isPresent).to.be.true;
    });
  });

  describe('change, close pane and cancel changes', () => {
    beforeEach(async function () {
      await editFilterPage.typeSelect.select('Blacklist');
      await editFilterPage.closePane.click();
      await editFilterPage.closeWithoutSaving.click();
    });

    it('filter form should be closed', () => {
      expect(editFilterPage.isPresent).to.be.false;
    });
  });
});
