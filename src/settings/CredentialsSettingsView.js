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

class CredentialsSettingsView extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    ezbCredentials: PropTypes.object,
  };

  render() {
    const { ezbCredentials } = this.props;

    return (
      <div>
        <Row>
          <Col xs={6}>
            <div data-test-ezbcredentials-libId>
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
