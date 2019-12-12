import {
  interactor,
  is,
  text,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class ManagementAccordion {
  static defaultScope = '#managementAccordion';
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class SourceDetailsPage {
  static defaultScope = '#pane-sourcedetails';

  sourceTitle = text('[data-test-source-header-title]');
  managementAccordion = new ManagementAccordion();
  technicalAccordion = new TechnicalAccordion();
  closePaneBtn = new ButtonInteractor('[icon=times]');
}
