import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
} from '@folio/stripes/components';

import urls from '../DisplayUtils/urls';

class FincNavigation extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  render() {
    const { id } = this.props;

    return (
      <ButtonGroup tagName="nav" fullWidth data-test-navigation>
        <Button
          buttonStyle={id === 'source' ? 'primary' : 'default'}
          data-test-navigation-source
          id="metadata-sources"
          to={urls.sources()}
        >
          Sources
        </Button>
        <Button
          buttonStyle={id === 'collection' ? 'primary' : 'default'}
          data-test-navigation-collection
          id="metadata-collections"
          to={urls.collections()}
        >
          Collections
        </Button>
        <Button
          buttonStyle={id === 'filter' ? 'primary' : 'default'}
          data-test-navigation-filter
          id="filters"
          to={urls.filters()}
        >
          Filters
        </Button>
      </ButtonGroup>
    );
  }
}

export default FincNavigation;