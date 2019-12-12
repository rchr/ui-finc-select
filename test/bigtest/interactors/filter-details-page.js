import {
  interactor,
  is,
  text,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class FileAccordion {
  static defaultScope = '#fileAccordion';
}

export default @interactor class FilterDetailsPage {
  static defaultScope = '#pane-filterdetails';

  filterTitle = text('[data-test-filter-header-title]');
  fileAccordion = new FileAccordion();
  closePaneBtn = new ButtonInteractor('[icon=times]');
  editFilterBtn = new ButtonInteractor('#clickable-edit-filter');
  downloadFileBtn = new ButtonInteractor('#download-file');
}
