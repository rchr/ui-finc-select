import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape
} from 'react-intl';
import {
  makeQueryFunction,
  SearchAndSort
} from '@folio/stripes/smart-components';

import packageInfo from '../../../package';

import MetadataCollectionView from './MetadataCollectionView';
import MetadataCollectionForm from './MetadataCollectionForm';
import Filter from './Filter/Filter';

import {
  handleFilterChange,
  getActiveFilters
} from './Filter/Util';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const filterConfig = [
  {
    label: 'Selected',
    name: 'selected',
    cql: 'selected',
    values: [],
  },
  {
    label: 'Free Content?',
    name: 'freeContent',
    cql: 'freeContent',
    values: [],
  },
  {
    label: 'permitted',
    name: 'permitted',
    cql: 'permitted',
    values: [],
  },
  {
    label: 'mdSource',
    name: 'mdSource',
    cql: 'mdSource',
    values: [],
  }
];

class MetadataCollections extends React.Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'label',
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      records: 'fincSelectMetadataCollections',
      recordsRequired: '%{resultCount}',
      perRequest: 30,
      path: 'finc-select/metadata-collections',
      resourceShouldRefresh: true,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(label="%{query.query}*")',
            {
              'Collection Name': 'label'
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    source: {
      type: 'okapi',
      records: 'fincSelectMetadataSources',
      path: 'finc-select/metadata-sources',
      resourceShouldRefresh: true
    },
    // get for the filter all sources but just the tiny with name and id
    mdSource: {
      type: 'okapi',
      records: 'tinyMetadataSources',
      path: 'finc-config/tiny-metadata-sources',
      resourceShouldRefresh: true
    }
  });

  static propTypes = {
    resources: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
      source: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func,
      }).isRequired,
    }).isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.getActiveFilters = getActiveFilters.bind(this);
    this.handleFilterChange = handleFilterChange.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
  }

  getArrayElementsCommaSeparated = (array) => {
    let formatted = '';
    if (array && array.length) {
      for (let i = 0; i < array.length; i += 1) {
        formatted += (i > 0 ? '; ' : '') + array[i];
      }
    }
    return formatted;
  }

  renderFilters(onChange) {
    const { resources } = this.props;
    const mdSource = _.get(resources, 'mdSource.records', []);
    const freeContentData = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Undetermined', value: 'undetermined' }
    ];

    // TODO: should be changed to string; need to wait for changes in backend
    const booleanData = [
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ];

    return (
      <Filter
        activeFilters={this.getActiveFilters()}
        onChange={onChange}
        queryMutator={this.props.mutator.query}
        // get data for source-filter from okapi
        mdSource={mdSource}
        // get bool-data for permitted and selected
        permitted={booleanData}
        selected={booleanData}
        freeContent={freeContentData}
      />
    );
  }

  render() {
    const packageInfoReWrite = () => {
      const path = '/finc-select/metadata-collections';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { stripes, intl } = this.props;

    const resultsFormatter = {
      label: collection => collection.label,
      mdSource: collection => _.get(collection, 'mdSource.id', '-'),
      permitted: collection => collection.permitted,
      // TODO selected: collection => collection.selected,
      filters: collection => this.getArrayElementsCommaSeparated(collection.filters),
      freeContent: collection => collection.freeContent,
    };

    return (
      <div data-test-collection-instances>
        <SearchAndSort
          // change packageInfo to prevent ERROR:Cannot read property 'cql' of undefined if switching tab
          // packageInfo={packageInfo}
          packageInfo={packageInfoReWrite()}
          objectName="metadataCollection"
          filterConfig={filterConfig}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          viewRecordComponent={MetadataCollectionView}
          editRecordComponent={MetadataCollectionForm}
          visibleColumns={['label', 'mdSource', 'permitted', 'filters', 'freeContent']}
          resultsFormatter={resultsFormatter}
          viewRecordPerms="metadatacollections.item.get"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-select.collection.label' }),
            mdSource: intl.formatMessage({ id: 'ui-finc-select.collection.mdSource' }),
            permitted: intl.formatMessage({ id: 'ui-finc-select.collection.permitted' }),
            // TODO: selected: intl.formatMessage({ id: 'ui-finc-select.collection.selected' }),
            filters: intl.formatMessage({ id: 'ui-finc-select.collection.filters' }),
            freeContent: intl.formatMessage({ id: 'ui-finc-select.collection.freeContent' })
          }}
          renderFilters={this.renderFilters}
          onFilterChange={this.handleFilterChange}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default injectIntl(MetadataCollections);
