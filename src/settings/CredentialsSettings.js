import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  TextField,
  KeyValue,
  Icon,
  Layout,
  Pane,
  Row,
  Col,
} from '@folio/stripes/components';
import CredentialsSettingsView from './CredentialsSettingsView';

class CredentialsSettings extends React.Component {
  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      path: 'finc-select/ezb-credentials',
      // resourceShouldRefresh: true
    },
  });

  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      logger: PropTypes.object,
    }),
    resources: PropTypes.object,
    mutator: PropTypes.shape({
      ezbCredentials: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  setRequiredValidation = (values) => {
    const errors = {};

    if (!values.isil) {
      errors.isil = 'Please fill Isil in to continue';
    }
    if (!values.tenant) {
      errors.tenant = 'Please fill Tenant in to continue';
    }
    return errors;
  }

  render() {
    const { resources } = this.props;

    return (
      <CredentialsSettingsView
        ezbCredentials={_.get(resources, 'ezbCredentials.records[0]')}
      />
    );
  }
}

export default CredentialsSettings;
