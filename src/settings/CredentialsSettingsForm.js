import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field
} from 'redux-form';
import {
  AccordionSet,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
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

class CredentialsSettingsForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    stripes: PropTypes.shape({
      okapi: PropTypes.object,
    }),
    ezbCredentials: PropTypes.object,
  };

  static defaultProps = {
    initialValues: {},
  }

  getPaneFooter() {
    const {
      handleSubmit,
      invalid,
      pristine,
      submitting
    } = this.props;

    const disabled = pristine || submitting || invalid;

    const startButton = (
      <Button
        data-test-filter-form-cancel-button
        marginBottom0
        id="clickable-close-filter-form"
        buttonStyle="default mega"
      >
        <FormattedMessage id="ui-finc-select.filter.form.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        data-test-filter-form-submit-button
        marginBottom0
        id="clickable-savefilter"
        buttonStyle="primary mega"
        type="submit"
        onClick={handleSubmit}
        disabled={disabled}
      >
        <FormattedMessage id="ui-finc-select.filter.form.saveAndClose" />
      </Button>
    );

    return <PaneFooter renderStart={startButton} renderEnd={endButton} />;
  }

  render() {
    const { ezbCredentials, initialValues } = this.props;
    const paneTitle = initialValues ? initialValues.user : <FormattedMessage id="ui-finc-select.filter.form.createFilter" />;

    const footer = this.getPaneFooter();

    return (
      <form
        // className={BasicStyle.styleForFormRoot}
        data-test-filter-form-page
        id="ezb-credentials"
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            footer={footer}
            paneTitle={paneTitle}
          >
            <Row>
              <Col xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  id="addfilter_label"
                  label={
                    <FormattedMessage id="ui-finc-select.ezbCredentials.libId">
                      {(msg) => msg + ' *'}
                    </FormattedMessage>}
                  name="libId"
                  placeholder="Enter a libId"
                />
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
      // <div>
      //   <Row>
      //     <Col xs={6}>
      //       <div data-test-ezbcredentials-libId>
      //         <Row>
      //           <KeyValue
      //             label={<FormattedMessage id="ui-finc-select.ezbCredentials.libId" />}
      //             value={_.get(ezbCredentials, 'libId', '-')}
      //           />
      //         </Row>
      //       </div>
      //     </Col>
      //   </Row>
      // </div>
    );
  }
}

export default stripesForm({
  // set navigationCheck true for confirming changes
  navigationCheck: true,
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
})(CredentialsSettingsForm);
