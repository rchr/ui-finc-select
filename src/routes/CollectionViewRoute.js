import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesConnect } from '@folio/stripes/core';

import urls from '../components/DisplayUtils/urls';
import MetadataCollectionView from '../components/MetadataCollections/MetadataCollectionView';

class CollectionViewRoute extends React.Component {
  static manifest = Object.freeze({
    collection: {
      type: 'okapi',
      path: 'finc-select/metadata-collections/:{id}',
    },
    sources: {
      type: 'okapi',
      records: 'fincSelectMetadataSources',
      path: 'finc-select/metadata-sources',
      resourceShouldRefresh: true
    },
    query: {},
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      collection: PropTypes.object,
      sources: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`${urls.collections()}${location.search}`);
  }

  handleEdit = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.collectionEdit(match.params.id)}${location.search}`);
  }

  getRecord = (id) => {
    return _.get(this.props.resources, 'collections.records', [])
      .find(i => i.id === id);
  }

  render() {
    const { handlers, stripes } = this.props;

    return (
      <MetadataCollectionView
        handlers={{
          ...handlers,
          onClose: this.handleClose,
          onEdit: this.handleEdit,
        }}
        isLoading={_.get(this.props.resources, 'collection.isPending', true)}
        record={_.get(this.props.resources, 'collection.records', []).find(i => i.id === this.props.match.params.id)}
        sources={_.get(this.props.resources, 'sources.records', [])}
        stripes={stripes}
      />
    );
  }
}

export default stripesConnect(CollectionViewRoute);
