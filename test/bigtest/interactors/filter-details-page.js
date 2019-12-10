import {
  interactor,
  is,
  isPresent,
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

  title = text('[data-test-filter-header-title]');
  fileAccordion = new FileAccordion();
  closePane = new ButtonInteractor('[icon=times]');
  editButtonPresent = isPresent('#clickable-edit-filter');
  clickEditButton = new ButtonInteractor('#clickable-edit-filter');
  downloadFileButton = new ButtonInteractor('#download-file');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
