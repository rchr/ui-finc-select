import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';

import { Route } from '@folio/stripes/core';

import SourcesRoute from './routes/SourcesRoute';
import SourceViewRoute from './routes/SourceViewRoute';
import CollectionsRoute from './routes/CollectionsRoute';
import CollectionViewRoute from './routes/CollectionViewRoute';
import FiltersRoute from './routes/FiltersRoute';
import FilterViewRoute from './routes/FilterViewRoute';
import FilterEditRoute from './routes/FilterEditRoute';
import FilterCreateRoute from './routes/FilterCreateRoute';

import Settings from './settings';

class FincSelect extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route path={`${path}/metadata-sources/:id?`} component={SourcesRoute}>
          <Route path={`${path}/metadata-sources/:id`} component={SourceViewRoute} />
        </Route>
        <Route path={`${path}/metadata-collections/:id?`} component={CollectionsRoute}>
          <Route path={`${path}/metadata-collections/:id`} component={CollectionViewRoute} />
        </Route>
        <Route path={`${path}/filters/create`} component={FilterCreateRoute} />
        <Route path={`${path}/filters/:id/edit`} component={FilterEditRoute} />
        <Route path={`${path}/filters/:id?`} component={FiltersRoute}>
          <Route path={`${path}/filters/:id`} component={FilterViewRoute} />
        </Route>
      </Switch>
    );
  }
}

export default FincSelect;
// export { default as MetadataSources } from './components/MetadataSources/MetadataSources';
