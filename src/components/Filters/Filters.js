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

import FilterView from './FilterView';
import FilterForm from './FilterForm';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const filterConfig = [
  {
    label: 'Type',
    name: 'type',
    cql: 'type',
    values: [
      { name: 'Whitelist', cql: 'Whitelist' },
      { name: 'Blacklist', cql: 'Blacklist' }
    ],
  }
];

class Filters extends React.Component {
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
      records: 'fincSelectFilters',
      recordsRequired: '%{resultCount}',
      perRequest: 30,
      path: 'finc-select/filters',
      resourceShouldRefresh: true,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(label="%{query.query}*")',
            {
              'Filter Name': 'label'
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    filterFiles: {
      type: 'okapi',
      records: 'fincSelectFilterFiles',
      path: 'finc-select/filter-files',
      resourceShouldRefresh: true
    }
  });

  static propTypes = {
    resources: PropTypes.shape({
      filters: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
      filterFiles: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      filters: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      filterFiles: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func,
      }).isRequired,
    }).isRequired,
    stripes: PropTypes.object,
    intl: intlShape.isRequired
  };

  closeNewInstance = (e) => {
    if (e) e.preventDefault();
    this.props.mutator.query.update({ layer: null });
  }

  create = (filter) => {
    const { mutator } = this.props;
    mutator.records.POST(filter)
      .then(() => {
        this.closeNewInstance();
      });
  }

  render() {
    const packageInfoReWrite = () => {
      const path = '/finc-select/filters';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { stripes, intl, resources } = this.props;
    // const filterFiles = _.get(resources, 'filterFiles.records', []);
    // const filterFiles = resources.filterFiles.records;

    return (
      <div data-test-filter-instances>
        <SearchAndSort
          packageInfo={packageInfoReWrite()}
          objectName="filter"
          filterConfig={filterConfig}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          viewRecordComponent={FilterView}
          editRecordComponent={FilterForm}
          newRecordInitialValues={{}}
          visibleColumns={['label', 'type']}
          onCreate={this.create}
          viewRecordPerms="filters.item.get"
          newRecordPerms="filters.item.post"
          parentResources={this.props.resources}
          // parentResources={this.props.filterFiles}
          parentMutator={this.props.mutator}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-select.filter.label' }),
            type: intl.formatMessage({ id: 'ui-finc-select.filter.type' })
          }}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default injectIntl(Filters);
