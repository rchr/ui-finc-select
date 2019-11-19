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
    }).isRequired,
    resources: PropTypes.shape({
      filter: PropTypes.object,
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
    const { handlers, resources } = this.props;

    return (
      <FilterForm
        contentData={resources}
        handlers={{
          onClose: this.handleClose,
          ...handlers,
        }}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(FilterCreateRoute);
