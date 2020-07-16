import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import CredentialsSettingsForm from './CredentialsSettingsForm';

class CredentialsSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.object,
    mutator: PropTypes.shape({
      ezbCredentials: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };
  // static propTypes = {
  //   stripes: PropTypes.shape({
  //     hasPerm: PropTypes.func.isRequired,
  //     okapi: PropTypes.object.isRequired,
  //   }).isRequired,
  // };

  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      path: 'finc-select/ezb-credentials',
    },
  });

  static defaultProps = {
    handlers: {},
  }

  constructor(props) {
    super(props);

    this.styles = {
      credentialsFormWrapper: {
        width: '100%',
      },
      credentialsFormHeight: {
        height: '100%',
      },
    };
  }

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'ezbCredentials.records[0]');

    return initialValues;
  }

  handleSubmit = (filter) => {
    const { history, location, mutator } = this.props;
    const collectionIdsForSave = filter.collectionIds;
    // remove collectionIds for saving filter
    const filterForSave = _.omit(filter, ['collectionIds']);

    mutator.ezbCredentials
      .PUT(filterForSave)
      .then(({ id }) => {
        if (collectionIdsForSave) {
          saveCollectionIds(id, collectionIdsForSave, this.props.stripes.okapi);
        }
        history.push(`${urls.filterView(id)}${location.search}`);
      });
  }

  render() {
    const { resources, stripes, initialValues } = this.props;

    return (
      <div
        data-test-settings-ezb-credentials
        style={this.styles.credentialsFormWrapper}
      >
        <CredentialsSettingsForm
          ezbCredentials={_.get(resources, 'ezbCredentials.records[0]')}
          initialValues={this.getInitialValues()}
          // initialValues={_.get(resources, 'ezbCredentials.records[0]')}
          onSubmit={this.handleSubmit}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default CredentialsSettings;
