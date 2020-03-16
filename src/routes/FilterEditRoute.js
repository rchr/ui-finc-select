import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import FilterForm from '../components/Filters/FilterForm';
import urls from '../components/DisplayUtils/urls';

class FilterEditRoute extends React.Component {
  static manifest = Object.freeze({
    filters: {
      type: 'okapi',
      path: 'finc-select/filters/:{id}',
      shouldRefresh: () => false,
    },
    availableCollections: {
      type: 'okapi',
      records: 'fincSelectMetadataCollections',
      path: 'finc-select/metadata-collections',
    },
    mdSources: {
      type: 'okapi',
      records: 'tinyMetadataSources',
      path: 'finc-config/tiny-metadata-sources',
      resourceShouldRefresh: true
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
    mutator: PropTypes.shape({
      filters: PropTypes.shape({
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      filter: PropTypes.object,
      availableCollections: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    handlers: {},
  }

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'filters.records', []).find(i => i.id === this.props.match.params.id);

    return initialValues;
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.filterView(match.params.id)}${location.search}`);
  }

  handleSubmit = (filter) => {
    const { history, location, mutator } = this.props;

    mutator.filters
      .PUT(filter)
      .then(({ id }) => {
        history.push(`${urls.filterView(id)}${location.search}`);
      });
  }

  deleteFilter = (filter) => {
    const { history, location, mutator } = this.props;

    mutator.filters.DELETE({ filter }).then(() => {
      history.push(`${urls.filters()}${location.search}`);
    });
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(resource => resource)
      .some(resource => resource.isPending);
  }

  render() {
    const { handlers, resources, stripes } = this.props;

    if (this.fetchIsPending()) return 'loading';

    return (
      <FilterForm
        contentData={resources}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        filterData={{
          mdSources: _.get(this.props.resources, 'mdSources.records', []),
        }}
        initialValues={this.getInitialValues()}
        availableCollections={_.get(this.props.resources, 'availableCollections.records', [])}
        isLoading={this.fetchIsPending()}
        onDelete={this.deleteFilter}
        onSubmit={this.handleSubmit}
        stripes={stripes}
      />
    );
  }
}

export default stripesConnect(FilterEditRoute);
