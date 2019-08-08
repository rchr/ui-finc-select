import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  IconButton,
  Pane,
  PaneMenu,
  Paneset
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import FilterInfoForm from './FilterInfo/FilterInfoForm';
import FilterFileUpload from './FilterFile/FilterFileUpload';
import FilterSupplementaryForm from './FilterSupplementary/FilterSupplementaryForm';

class FilterForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape().isRequired,
    parentMutator: PropTypes.object.isRequired,
  };

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const filter = (parentResources.records || {}).records || [];
    if (!filter || filter.length === 0 || !id) return null;
    return filter.find(u => u.id === id);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-select.filter.form.close">
          { ariaLabel => (
            <IconButton
              id="clickable-closefilterdialog"
              onClick={onCancel}
              ariaLabel={ariaLabel}
              icon="times"
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting } = this.props;

    return (
      // set button to save changes
      <PaneMenu>
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  render() {
    const { initialValues, handleSubmit, parentMutator } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-select.filter.form.createFilter" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.updateFilter" />) :
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.createFilter" />);

    const filterFiles = this.props.parentResources.filterFiles;

    return (
      <form id="form-filter" onSubmit={handleSubmit}>
        <Paneset style={{ position: 'relative' }}>
          <Pane
            defaultWidth="100%"
            firstMenu={firstMenu}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            {/* add padding behind last Row; otherwise content is cutted of */}
            <div className="FilterForm" style={{ paddingBottom: '100px' }}>
              {/* <FilterInfoForm
                accordionId="editFilterInfo"
                {...this.props}
              /> */}
              {/* <FilterFileUpload
                accordionId="editFilterUpload"
                {...this.props}
              /> */}
              <FilterSupplementaryForm
                accordionId="editFilterSupplementary"
                filter={initialValues}
                filterFiles={filterFiles.records}
                data={filterFiles.records}
                parentMutator={parentMutator}
                {...this.props}
              />
            </div>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'form-filter',
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
})(FilterForm);
