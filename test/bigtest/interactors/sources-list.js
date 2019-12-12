import {
  interactor,
  isPresent,
  scoped,
  collection,
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class SourcesList {
  static defaultScope = '[data-test-sources]';

  navigation = new NavigationInteractor();
  instances = collection('[role=group] div a');
  instance = scoped('#pane-sourcedetails');
  statusFilterIsPresent = isPresent('section[id="filter-accordion-status"]');
  resetAllBtnIsPresent = isPresent('button[id="clickable-reset-all"]');
  submitBtnIsPresent = isPresent('button[id="sourceSubmitSearch"]');
  searchFieldIsPresent = isPresent('input[id="sourceSearchField"]');

  isLoaded = isPresent('#pane-sourceresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
