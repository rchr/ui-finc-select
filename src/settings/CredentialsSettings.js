import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer } from '@folio/stripes/core';

class CredentialsSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
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
    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            baseUrl="finc-select/ezb-credentials"
            columnMapping={{
              user: intl.formatMessage({ id: 'ui-finc-select.settings.credentials.user' }),
              password: intl.formatMessage({ id: 'ui-finc-select.settings.credentials.password' }),
              libId: intl.formatMessage({ id: 'ui-finc-select.settings.credentials.libId' }),
              isil: intl.formatMessage({ id: 'ui-finc-select.settings.credentials.isil' }),
            }}
            data-test-settings-finc-select-credentials
            // hiddenFields={['description', 'numberOfObjects']}
            id="fincSelectEZBCredentials"
            label={<FormattedMessage id="ui-finc-select.settings.credentials.label" />}
            labelSingular={<FormattedMessage id="ui-finc-select.settings.credentials.labelSingular" />}
            nameKey="name"
            objectLabel={<FormattedMessage id="ui-finc-select.settings.credentials.labelSingular" />}
            records="fincSelectEZBCredentials"
            sortby="name"
            // validate={this.setRequiredValidation}
            visibleFields={['user', 'password', 'libId', 'isil']}
            {...this.props}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default CredentialsSettings;
