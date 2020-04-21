import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import FilterForm from '../components/Filters/FilterForm';
import urls from '../components/DisplayUtils/urls';

class FilterCreateRoute extends React.Component {
  static manifest = Object.freeze({
    filters: {
      type: 'okapi',
      path: 'finc-select/filters',
      fetch: false,
      shouldRefresh: () => false,
    },
    collectionsIds: {
      type: 'okapi',
      path: 'finc-select/filters/:{id}/collections',
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
    mutator: PropTypes.shape({
      filters: PropTypes.shape({
      }).isRequired,
      collectionsIds: PropTypes.shape({
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      filter: PropTypes.object,
      collectionsIds: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`${urls.filters()}${location.search}`);
  }

  saveCollectionIds = (filterId, collectionIds) => {
    const { stripes: { okapi } } = this.props;

    return fetch(`${okapi.url}/finc-select/filters/${filterId}/collections`, {
      method: 'PUT',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'collectionIds': collectionIds
      })
    });
  }

  handleSubmit = (filter) => {
    const { history, location, mutator } = this.props;
    const collectionIdsForSave = filter.collectionIds;
    const filterForSave = _.omit(filter, ['collectionIds']);

    mutator.filters
      .POST(filterForSave)
      .then(({ id }) => {
        this.saveCollectionIds(id, collectionIdsForSave);
        history.push(`${urls.filterView(id)}${location.search}`);
      });
  }

  render() {
    const { handlers, resources, stripes } = this.props;
    const collectionIds = [];

    return (
      <FilterForm
        contentData={resources}
        collectionIds={collectionIds}
        handlers={{
          onClose: this.handleClose,
          ...handlers,
        }}
        onSubmit={this.handleSubmit}
        stripes={stripes}
        selectRecords={this.getSelectedCollections}
      />
    );
  }
}

export default stripesConnect(FilterCreateRoute);
