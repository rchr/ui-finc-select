import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import FilterInfoForm from './FilterInfo/FilterInfoForm';
import FilterFileForm from './FilterFile/FilterFileForm';

class FilterForm extends React.Component {
  static propTypes = {
    handlers: PropTypes.PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    stripes: PropTypes.shape({
      okapi: PropTypes.object,
    }),
  };

  static defaultProps = {
    initialValues: {},
  }

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

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-select.filter.form.close">
          { ariaLabel => (
            <IconButton
              ariaLabel={ariaLabel}
              icon="times"
              id="clickable-closefilterdialog"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, initialValues, handleSubmit } = this.props;
    const { confirmDelete } = this.state;
    const isEditing = initialValues && initialValues.id;

    return (
      // set button to save changes
      <PaneMenu>
        {isEditing &&
        <IfPermission perm="finc-select.filters.item.delete">
          <Button
            buttonStyle="danger"
            disabled={confirmDelete}
            id="clickable-delete-filter"
            marginBottom0
            onClick={this.beginDelete}
            title="delete"
          >
            <FormattedMessage id="ui-finc-select.filter.form.deleteFilter" />
          </Button>
        </IfPermission>
        }
        <Button
          buttonStyle="primary paneHeaderNewButton"
          disabled={pristine || submitting}
          id={id}
          marginBottom0
          onClick={handleSubmit}
          title={label}
          type="submit"
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
    const { initialValues, isLoading, onDelete } = this.props;
    const { confirmDelete, sections } = this.state;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-select.filter.form.createFilter" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.updateFilter" />) :
      this.getLastMenu('clickable-createnewfilter', <FormattedMessage id="ui-finc-select.filter.form.createFilter" />);

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <form id="form-filter" data-test-filter-form-page>
        <Paneset style={{ position: 'relative' }}>
          <Pane
            defaultWidth="100%"
            firstMenu={firstMenu}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            {/* add padding behind last Row; otherwise content is cutted of */}
            <div
              className="FilterForm"
              style={{ paddingBottom: '100px' }}
            >
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
                // stripes={stripes}
                {...this.props}
              />
              <ConfirmationModal
                heading={<FormattedMessage id="ui-finc-select.filter.form.deleteFilter" />}
                id="delete-filter-confirmation"
                message={`Do you really want to delete ${initialValues.label}?`}
                onCancel={() => { this.confirmDelete(false); }}
                onConfirm={onDelete}
                open={confirmDelete}
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
