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

  handleSubmit = (filter) => {
    const { history, location, mutator } = this.props;

    mutator.filters
      .POST(filter)
      .then(({ id }) => {
        history.push(`${urls.filterView(id)}${location.search}`);
      });
  }

  render() {
    const { handlers, resources, stripes } = this.props;
    const collectionIds = _.get(this.props.resources, 'collectionsIds.records', []);

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
      />
    );
  }
}

export default stripesConnect(FilterCreateRoute);
