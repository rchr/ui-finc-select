import {
  interactor,
  isPresent,
  scoped,
  collection,
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class CollectionsList {
  static defaultScope = '[data-test-collections]';

  navigation = new NavigationInteractor();
  instances = collection('[role=group] div a');
  instance = scoped('#pane-collectiondetails');
  mdSourceFilterIsPresent = isPresent('section[id="filter-accordion-mdSource"]');
  freeContentFilterIsPresent = isPresent('section[id="filter-accordion-freeContent"]');
  permittedFilterIsPresent = isPresent('section[id="filter-accordion-permitted"]');
  selectedFilterIsPresent = isPresent('section[id="filter-accordion-selected"]');
  resetAllBtnIsPresent = isPresent('button[id="clickable-reset-all"]');
  submitBtnIsPresent = isPresent('button[id="collectionSubmitSearch"]');
  searchFieldIsPresent = isPresent('input[id="collectionSearchField"]');

  isLoaded = isPresent('#pane-collectionresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
