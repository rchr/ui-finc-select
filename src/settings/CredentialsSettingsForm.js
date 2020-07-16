import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { autofill, change, getFormValues, Field } from 'redux-form';
import {
  Button,
  Col,
  ConfirmationModal,
  Icon,
  IconButton,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import { Required } from '../components/DisplayUtils/Validate';
import BasicStyle from '../components/BasicStyle.css';

class CredentialsSettingsForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
      store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired
      })
    }).isRequired,
    ezbCredentials: PropTypes.object,
  };

  getPaneFooter() {
    const {
      handleSubmit,
      invalid,
      pristine,
      submitting
    } = this.props;

    const disabled = pristine || submitting || invalid;

    const endButton = (
      <Button
        data-test-ezbcredentials-form-submit-button
        marginBottom0
        id="clickable-saveezbcredentials"
        buttonStyle="primary"
        type="submit"
        onClick={handleSubmit}
        disabled={disabled}
      >
        <FormattedMessage id="ui-finc-select.settings.ezbCredentials.save" />
      </Button>
    );

    return <PaneFooter renderEnd={endButton} />;
  }

  render() {
    // const { ezbCredentials, initialValues } = this.props;
    const footer = this.getPaneFooter();

    return (
      <form
        className={BasicStyle.styleForFormRoot}
        data-test-filter-form-page
        id="ezb-credentials"
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            footer={footer}
            paneTitle="EZB credentials"
          >
            <Row>
              <Col xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addezbcredentials_user"
                  label={
                    <FormattedMessage id="ui-finc-select.settings.ezbCredentials.user">
                      {(msg) => msg + ' *'}
                    </FormattedMessage>}
                  name="user"
                  placeholder="Enter a user"
                  validate={Required}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addezbcredentials_password"
                  label={
                    <FormattedMessage id="ui-finc-select.settings.ezbCredentials.password">
                      {(msg) => msg + ' *'}
                    </FormattedMessage>}
                  name="password"
                  placeholder="Enter a password"
                  validate={Required}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addezbcredentials_libId"
                  label={
                    <FormattedMessage id="ui-finc-select.settings.ezbCredentials.libId">
                      {(msg) => msg + ' *'}
                    </FormattedMessage>}
                  // name={initialValues.libId}
                  name="libId"
                  placeholder="Enter a libId"
                  validate={Required}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addezbcredentials_isil"
                  label={
                    <FormattedMessage id="ui-finc-select.settings.ezbCredentials.isil">
                      {(msg) => msg}
                    </FormattedMessage>}
                  name="isil"
                  placeholder="Enter a isil"
                />
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'ezbCredentialsForm',
  // set navigationCheck true for confirming changes
  navigationCheck: true,
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
})(CredentialsSettingsForm);
