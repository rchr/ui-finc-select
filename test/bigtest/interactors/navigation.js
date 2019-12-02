import {
  attribute,
  interactor,
  is,
  property,
} from '@bigtest/interactor';


@interactor class ButtonInteractor {
  isButton = is('button');
  isDisabled = property('disabled');
  disabled = attribute('disabled');

  isPrimary = is('[class*="primary"]');
}

export default interactor(class NavigationInteractor {
  static defaultScope = '[data-test-navigation]';

  sourceNavBtn = new ButtonInteractor('[data-test-navigation-source]');
  collectionNavBtn = new ButtonInteractor('[data-test-navigation-collection]');
  filterNavBtn = new ButtonInteractor('[data-test-navigation-filter]');
});
