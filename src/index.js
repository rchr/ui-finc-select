import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';

import { Route } from '@folio/stripes/core';

import SourcesRoute from './routes/SourcesRoute';
// import SourceEditRoute from './routes/SourceEditRoute';
// import SourceCreateRoute from './routes/SourceCreateRoute';
// import SourceViewRoute from './routes/SourceViewRoute';
// import CollectionsRoute from './routes/CollectionsRoute';
// import CollectionViewRoute from './routes/CollectionViewRoute';
// import CollectionCreateRoute from './routes/CollectionCreateRoute';
// import CollectionEditRoute from './routes/CollectionEditRoute';

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
        {/* <Route path={`${path}/metadata-sources/create`} component={SourceCreateRoute} />
        <Route path={`${path}/metadata-sources/:id/edit`} component={SourceEditRoute} /> */}
        <Route path={`${path}/metadata-sources/:id?`} component={SourcesRoute}>
          {/* <Route path={`${path}/metadata-sources/:id`} component={SourceViewRoute} /> */}
        </Route>
        {/* <Route path={`${path}/metadata-collections/create`} component={CollectionCreateRoute} />
        <Route path={`${path}/metadata-collections/:id/edit`} component={CollectionEditRoute} />
        <Route path={`${path}/metadata-collections/:id?`} component={CollectionsRoute}>
          <Route path={`${path}/metadata-collections/:id`} component={CollectionViewRoute} />
        </Route> */}
      </Switch>
    );
  }
}

export default FincSelect;
// export { default as MetadataSources } from './components/MetadataSources/MetadataSources';
