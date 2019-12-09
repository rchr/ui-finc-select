import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditFilterPage from '../interactors/filter-edit-page';
import FilterInteractor from '../interactors/filter';

describe('Create Filter', () => {
  setupApplication();
  const filterInteractor = new FilterInteractor();
  const editFilterPage = new EditFilterPage();

  // let filter = null;

  beforeEach(async function () {
    // filter = this.server.create('finc-select-filter');
    return this.visit('/finc-select/filters/create?filters=type.Whitelist', () => {
      expect(filterInteractor.$root).to.exist;
    });
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

  describe('close filter form', () => {
    beforeEach(async function () {
      await editFilterPage.closePane.click();
    });

    it('closes filter form', () => {
      expect(editFilterPage.isPresent).to.be.false;
      expect(filterInteractor.isPresent).to.be.true;
    });
  });
});
