import {
  interactor
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

// https://bigtestjs.io/guides/interactors/introduction/
export default @interactor class ApplicationInteractor {
  static defaultScope = '#ModuleContainer';

  navigationSourcesBtn = 'button[id="metadata-sources"]';
  navigationCollectionBtn = 'button[id="metadata-collections"]';
  navigationFilterBtn = 'button[id="filters"]';
  navigation = new NavigationInteractor();
}
