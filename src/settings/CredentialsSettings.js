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
import { stripesConnect } from '@folio/stripes/core';
import {
  StripesConnectedSource
} from '@folio/stripes/smart-components';
import CredentialsSettingsView from './CredentialsSettingsView';


// import { ControlledVocab } from '@folio/stripes/smart-components';
// import { IntlConsumer } from '@folio/stripes/core';

class CredentialsSettings extends React.Component {
  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      // records: 'fincSelectEZBCredentials',
      records: 'ezbCredentials',
      path: 'finc-select/ezb-credentials',
      // resourceShouldRefresh: true
    },
  });

  static propTypes = {
    children: PropTypes.node,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      logger: PropTypes.object,
    }),
    ezbCredentials: PropTypes.object,
    resources: PropTypes.object,
    mutator: PropTypes.shape({
      ezbCredentials: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    record: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.ezbCredentials = new StripesConnectedSource(this.props, this.logger, 'ezbCredentials');


    console.log(this.props.resources);
    // this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  componentDidMount() {
    this.ezbCredential = new StripesConnectedSource(this.props, this.logger, 'ezbCredentials');
  }

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
    // const { ezbCredentials, stripes } = this.props;
    const { record, stripes, children } = this.props;

    console.log(this.ezbCredentials);
    return (
      <CredentialsSettingsView
        ezbCredentials={_.get(this.props.resources)}
      />
    );
  }
}

export default stripesConnect(CredentialsSettings);
