import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row
} from '@folio/stripes/components';
import {
  IfPermission
} from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';
import FilterInfoForm from './FilterInfo/FilterInfoForm';
import FilterFileForm from './FilterFile/FilterFileForm';

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

  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      sections: {
        editFilterInfo: true,
        editFilterFile: true
      },
    };

    this.handleExpandAll = this.handleExpandAll.bind(this);
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const filter = (parentResources.records || {}).records || [];
    if (!filter || filter.length === 0 || !id) return null;
    return filter.find(u => u.id === id);
  }

  beginDelete = () => {
    this.setState({
      confirmDelete: true,
    });
  }

  confirmDelete = (confirmation) => {
    if (confirmation) {
      this.deleteFilter();
    } else {
      this.setState({ confirmDelete: false });
    }
  }

  deleteFilter = () => {
    const { parentMutator, initialValues: { id } } = this.props;
    parentMutator.records.DELETE({ id }).then(() => {
      parentMutator.query.update({
        _path: 'finc-select/filters',
        layer: null
      });
    });
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
    const { pristine, submitting, initialValues } = this.props;
    const { confirmDelete } = this.state;
    const isEditing = initialValues && initialValues.id;

    return (
      // set button to save changes
      <PaneMenu>
        {isEditing &&
        <IfPermission perm="finc-select.filters.item.delete">
          <Button
            id="clickable-delete-udp"
            title="delete"
            buttonStyle="danger"
            onClick={this.beginDelete}
            disabled={confirmDelete}
            marginBottom0
          >
            <FormattedMessage id="ui-finc-select.filter.form.deleteFilter" />
          </Button>
        </IfPermission>
        }
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

  handleExpandAll(sections) {
    this.setState({ sections });
  }

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const newState = _.cloneDeep(state);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render() {
    const { initialValues, handleSubmit } = this.props;
    const { confirmDelete, sections } = this.state;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-select.filter.form.createFilter" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.updateFilter" />) :
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.createFilter" />);

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
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    id="clickable-expand-all"
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <FilterInfoForm
                accordionId="editFilterInfo"
                expanded={sections.editFilterInfo}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <FilterFileForm
                accordionId="editFilterFile"
                expanded={sections.editFilterFile}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <ConfirmationModal
                id="delete-filter-confirmation"
                heading={<FormattedMessage id="ui-finc-select.filter.form.deleteFilter" />}
                message={`Do you really want to delete ${initialValues.label}?`}
                open={confirmDelete}
                onConfirm={() => { this.confirmDelete(true); }}
                onCancel={() => { this.confirmDelete(false); }}
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
  // set navigationCheck true for confirming changes
  navigationCheck: true,
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
})(FilterForm);
