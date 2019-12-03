import {
  interactor,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class FilterInteractor {
  static defaultScope = '[data-test-filters]';

  clickWhitelistFILTERsCheckbox = clickable('#clickable-filter-type-whitelist');
  instances = collection('[role=group] div a');
  instance = scoped('#pane-filterdetails');
  navigation = new NavigationInteractor();

  isLoaded = isPresent('#pane-filterresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
