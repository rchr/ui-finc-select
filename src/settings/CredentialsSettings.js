import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import CredentialsSettingsForm from './CredentialsSettingsForm';

class CredentialsSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    resources: PropTypes.object,
    mutator: PropTypes.shape({
      ezbCredentials: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      path: 'finc-select/ezb-credentials',
      throwErrors: false,
    },
  });

  constructor(props) {
    super(props);

    this.styles = {
      credentialsFormWrapper: {
        width: '100%',
      },
    };
  }

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'ezbCredentials.records[0]');

    return initialValues;
  }

  handleSubmit = (values) => {
    const { mutator } = this.props;

    mutator.ezbCredentials
      .PUT(values);
  }

  render() {
    const { stripes } = this.props;

    return (
      <div
        data-test-settings-ezb-credentials
        style={this.styles.credentialsFormWrapper}
      >
        <CredentialsSettingsForm
          initialValues={this.getInitialValues()}
          onSubmit={this.handleSubmit}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default CredentialsSettings;
