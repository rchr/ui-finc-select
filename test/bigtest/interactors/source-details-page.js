import {
  interactor,
  text
} from '@bigtest/interactor';

@interactor class ManagementAccordion {
  static defaultScope = '#managementAccordion';
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class SourceDetailsPage {
  static defaultScope = '#pane-sourcedetails';
  title = text('[data-test-source-header-title]');
  managementAccordion = new ManagementAccordion();
  technicalAccordion = new TechnicalAccordion();
}
