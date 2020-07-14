import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
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
import CredentialsSettingsForm from './CredentialsSettingsForm';

class CredentialsSettings extends React.Component {
  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      path: 'finc-select/ezb-credentials',
      // resourceShouldRefresh: true
    },
  });

  static propTypes = {
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
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
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

    mutator.filters
      .PUT(filterForSave)
      .then(({ id }) => {
        if (collectionIdsForSave) {
          saveCollectionIds(id, collectionIdsForSave, this.props.stripes.okapi);
        }
        history.push(`${urls.filterView(id)}${location.search}`);
      });
  }

  render() {
    const { resources, stripes } = this.props;

    return (
      <CredentialsSettingsForm
        ezbCredentials={_.get(resources, 'ezbCredentials.records[0]')}
        initialValues={this.getInitialValues()}
        onSubmit={this.handleSubmit}
        stripes={stripes}
      />
    );
  }
}

export default stripesConnect(CredentialsSettings);
