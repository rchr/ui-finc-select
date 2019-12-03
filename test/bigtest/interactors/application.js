import {
  interactor
} from '@bigtest/interactor';

// https://bigtestjs.io/guides/interactors/introduction/
export default @interactor class ApplicationInteractor {
  // fincHeader = text('[data-test-layout]');
  static defaultScope = '#ModuleContainer';
  // static defaultScope = '#finc-select-module-display';
  // button = scoped('[class*=buttonGroup---] button');
  buttonSources = 'button[id="metadata-sources"]';
  buttonCollection = 'button[id="metadata-collections"]';
  buttonFilter = 'button[id="filters"]';

  // static defaultScope = '#pane-results';
  // appTitle = text('[class*=paneTitleLabel---]');

  // guideLink = property('[data-test-application-guide] a', 'href');
}
