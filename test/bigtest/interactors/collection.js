import {
  interactor,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class CollectionInteractor {
  static defaultScope = '[data-test-collections]';

  clickMetadataAvailableCOLLECTIONsCheckbox = clickable('#clickable-filter-metadata-available-yes');
  instances = collection('[role=group] div a');
  instance = scoped('#pane-collectiondetails');
  navigation = new NavigationInteractor();

  isLoaded = isPresent('#pane-collectionresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
