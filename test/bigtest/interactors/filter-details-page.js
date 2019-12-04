import {
  interactor,
  text
} from '@bigtest/interactor';

@interactor class FileAccordion {
  static defaultScope = '#fileAccordion';
}

export default @interactor class FilterDetailsPage {
  static defaultScope = '#pane-filterdetails';
  title = text('[data-test-filter-header-title]');
  fileAccordion = new FileAccordion();
}
