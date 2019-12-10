import {
  interactor,
  is,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

@interactor class ButtonInteractor {
  isButton = is('button');
}

export default @interactor class FilterInteractor {
  static defaultScope = '[data-test-filters]';

  clickWhitelistFILTERsCheckbox = clickable('#clickable-filter-type-whitelist');
  instances = collection('[role=group] div a');
  instance = scoped('#pane-filterdetails');
  navigation = new NavigationInteractor();
  typeFilterIsPresent = isPresent('section[id="filter-accordion-type"]');
  resetAllBtnIsPresent = isPresent('button[id="clickable-reset-all"]');
  submitBtnIsPresent = isPresent('button[id="filterSubmitSearch"]');
  searchFieldIsPresent = isPresent('input[id="filterSearchField"]');
  addNewFilterBtn = new ButtonInteractor('#clickable-new-filter');

  isLoaded = isPresent('#pane-filterresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
