import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field
} from 'redux-form';
import {
  TextField,
  KeyValue,
  Icon,
  Layout,
  Pane,
  Row,
  Col,
} from '@folio/stripes/components';

// import { ControlledVocab } from '@folio/stripes/smart-components';
// import { IntlConsumer } from '@folio/stripes/core';

class CredentialsSettingsView extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    ezbCredentials: PropTypes.object,
  };

  render() {
    const { ezbCredentials, stripes } = this.props;

    // const test = _.get(this.props.resources, 'ezbCredentials', []);
    console.log(ezbCredentials);
    return (
      <div>
        <Row>
          <Col xs={6}>
            <div data-test-ezbCredentials-libId>
              <Row>
                <KeyValue
                  label={<FormattedMessage id="ui-finc-select.ezbCredentials.libId" />}
                  value={_.get(ezbCredentials, 'libId', '-')}
                />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CredentialsSettingsView;
