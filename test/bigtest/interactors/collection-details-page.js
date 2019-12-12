import {
  interactor,
  is,
  text,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class ContentAccordion {
  static defaultScope = '#contentAccordion';
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class CollectionDetailsPage {
  static defaultScope = '#pane-collectiondetails';

  collectionTitle = text('[data-test-collection-header-title]');
  contentAccordion = new ContentAccordion();
  technicalAccordion = new TechnicalAccordion();
  closeCollectionDetailsBtn = new ButtonInteractor('[icon=times]');
}
