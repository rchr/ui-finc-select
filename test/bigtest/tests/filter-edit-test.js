import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditFilterPage from '../interactors/filter-edit-page';
import FilterInteractor from '../interactors/filter';

describe('Edit Filter', () => {
  setupApplication();
  const filterInteractor = new FilterInteractor();
  const editFilterPage = new EditFilterPage();

  let filter = null;

  beforeEach(async function () {
    filter = this.server.create('finc-select-filter');
    return this.visit('/finc-select/filters?filters=type.Whitelist', () => {
      expect(filterInteractor.$root).to.exist;
    });
  });

  describe('filter edit form is displayed', () => {
    beforeEach(async function () {
      await this.visit('/finc-select/filters?filters=type.Whitelist');
      return this.visit(`/finc-select/filters/${filter.id}/edit?filters=type.Whitelist`);
    });

    it('displays Edit filter form', () => {
      expect(editFilterPage.$root).to.exist;
    });

    describe('Confirm delete filter is displayed', () => {
      beforeEach(async function () {
        await editFilterPage.clickDeleteFilter();
      });
      it('displays confirm delete filter', () => {
        expect(editFilterPage.deleteFilterConfirmation).to.exist;
      });
    });
  });
});
