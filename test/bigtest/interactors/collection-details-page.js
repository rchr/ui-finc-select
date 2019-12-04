import {
  interactor,
  text
} from '@bigtest/interactor';

@interactor class ContentAccordion {
  static defaultScope = '#contentAccordion';
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class CollectionDetailsPage {
  static defaultScope = '#pane-collectiondetails';
  title = text('[data-test-collection-header-title]');
  contentAccordion = new ContentAccordion();
  technicalAccordion = new TechnicalAccordion();
}
