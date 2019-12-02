import {
  interactor,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class SourceInteractor {
  static defaultScope = '[data-test-sources]';

  clickActiveSOURCEsCheckbox = clickable('#clickable-filter-status-active');
  instances = collection('[role=group] div a');
  instance = scoped('#pane-sourcedetails');
  navigation = new NavigationInteractor();

  isLoaded = isPresent('#pane-sourceresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
