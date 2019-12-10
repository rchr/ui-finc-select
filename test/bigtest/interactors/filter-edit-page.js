import {
  clickable,
  interactor,
  Interactor,
  is,
  isPresent,
  text,
  value,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class TypeSelect {
  static defaultScope = 'select[name="type"]';
  value = value();
}

@interactor class DeleteFilterConfirmation {
  static defaultScope = '#delete-filter-confirmation';
}

export default @interactor class EditFilterPage {
  static defaultScope = '[data-test-filter-form-page]';
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  title = text('[class*=paneTitleLabel---]');
  typeSelect = new TypeSelect();
  filterName = new Interactor('input[name=label]');
  deleteFilterConfirmation = new DeleteFilterConfirmation();
  clickDeleteFilter = clickable('#clickable-delete-filter');
  closePane = new ButtonInteractor('[icon=times]');
  addFilterFileBtn = new ButtonInteractor('#add-filter-file-btn');
  createNewFilterBtn = new ButtonInteractor('#clickable-createnewfilter');
  closeEditPaneBtn = new ButtonInteractor('#clickable-closefilterdialog');
  uploadFilterFileBtnIsPresent = isPresent('[data-test-filter-file-upload-button]');
  filterFileCardIsPresent = isPresent('[data-test-filter-file-card]');
}
