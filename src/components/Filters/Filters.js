import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import {
  SearchAndSortQuery,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';
import {
  Button,
  ButtonGroup,
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  Paneset,
  SearchField,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import urls from '../DisplayUtils/urls';
import FilterFilters from './FilterFilters';

// const filterConfig = [
//   {
//     label: 'Type',
//     name: 'type',
//     cql: 'type',
//     values: [
//       { name: 'Whitelist', cql: 'Whitelist' },
//       { name: 'Blacklist', cql: 'Blacklist' }
//     ],
//   }
// ];

class Filters extends React.Component {
  // static manifest = Object.freeze({
  //   initializedFilterConfig: { initialValue: false },
  //   query: {
  //     initialValue: {
  //       query: '',
  //       filters: 'type.Whitelist,type.Blacklist',
  //       sort: 'label',
  //     },
  //   },
  //   resultCount: { initialValue: INITIAL_RESULT_COUNT },
  //   records: {
  //     type: 'okapi',
  //     records: 'fincSelectFilters',
  //     recordsRequired: '%{resultCount}',
  //     perRequest: 30,
  //     path: 'finc-select/filters',
  //     resourceShouldRefresh: true,
  //     GET: {
  //       params: {
  //         query: makeQueryFunction(
  //           'cql.allRecords=1',
  //           '(label="%{query.query}*")',
  //           {
  //             'Filter Name': 'label'
  //           },
  //           filterConfig,
  //           2,
  //         ),
  //       },
  //       staticFallback: { params: {} },
  //     },
  //   }
  // });

  static propTypes = {
    children: PropTypes.object,
    contentData: PropTypes.arrayOf(PropTypes.object),
    disableRecordCreation: PropTypes.bool,
    intl: intlShape.isRequired,
    onSelectRow: PropTypes.func,
    packageInfo: PropTypes.shape({ // values pulled from the provider's package.json config object
      initialFilters: PropTypes.string, // default filters
      moduleName: PropTypes.string, // machine-readable, for HTML ids and translation keys
      stripes: PropTypes.shape({
        route: PropTypes.string, // base route; used to construct URLs
      }).isRequired,
    }),
    queryGetter: PropTypes.func,
    querySetter: PropTypes.func,
    searchString: PropTypes.string,
    source: PropTypes.object,
    // add values for search-selectbox
    onChangeIndex: PropTypes.func,
    selectedIndex: PropTypes.object,
    selectedRecordId: PropTypes.string,
  };

  static defaultProps = {
    contentData: {},
    searchString: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      filterPaneIsVisible: true,
    };
  }

  resultsFormatter = {
    label: filter => filter.label,
    type: filter => filter.type,
  };

  rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;
    let RowComponent;

    if (this.props.onSelectRow) {
      RowComponent = 'div';
    } else {
      RowComponent = Link;
      rowProps.to = this.rowURL(rowData.id);
    }

    return (
      <RowComponent
        aria-rowindex={rowIndex + 2}
        className={rowClass}
        data-label={[
          rowData.name,
        ]}
        key={`row-${rowIndex}`}
        role="row"
        {...rowProps}
      >
        {cells}
      </RowComponent>
    );
  }

  // generate url for record-details
  rowURL = (id) => {
    return `${urls.sourceView(id)}${this.props.searchString}`;
  }

  // fade in/out of filter-pane
  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }

  // fade in / out the filter menu
  renderResultsFirstMenu = (filters) => {
    const { filterPaneIsVisible } = this.state;
    const filterCount = filters.string !== '' ? filters.string.split(',').length : 0;
    const hideOrShowMessageId = filterPaneIsVisible ?
      'stripes-smart-components.hideSearchPane' : 'stripes-smart-components.showSearchPane';

    return (
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.numberOfFilters" values={{ count: filterCount }}>
          {appliedFiltersMessage => (
            <FormattedMessage id={hideOrShowMessageId}>
              {hideOrShowMessage => (
                <FilterPaneToggle
                  aria-label={`${hideOrShowMessage}...${appliedFiltersMessage}`}
                  onClick={this.toggleFilterPane}
                  visible={filterPaneIsVisible}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  // counting records of result list
  renderResultsPaneSubtitle = (source) => {
    if (source) {
      const count = source ? source.totalCount() : 0;
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }

  render() {
    const { intl, queryGetter, querySetter, onSelectRow, selectedRecordId, source } = this.props;
    const count = source ? source.totalCount() : 0;

    return (
      <div data-test-filter-instances>
        {/* <SearchAndSort
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
          viewRecordPerms="finc-select.filters.item.get"
          newRecordPerms="finc-select.filters.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-select.filter.label' }),
            type: intl.formatMessage({ id: 'ui-finc-select.filter.type' })
          }}
          stripes={stripes}
        /> */}
        <SearchAndSortQuery
          initialFilterState={{ type: ['Whitelist', 'Blacklist'] }}
          initialSearchState={{ query: '' }}
          initialSortState={{ sort: 'label' }}
          queryGetter={queryGetter}
          querySetter={querySetter}
        >
          {
            ({
              activeFilters,
              filterChanged,
              getFilterHandlers,
              getSearchHandlers,
              onSort,
              onSubmitSearch,
              resetAll,
              searchChanged,
              searchValue,
            }) => {
              const disableReset = () => (!filterChanged && !searchChanged);

              return (
                <Paneset>
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      defaultWidth="18%"
                      onClose={this.toggleFilterPane}
                      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                    >
                      <form onSubmit={onSubmitSearch}>
                        <ButtonGroup tagName="nav" fullWidth>
                          <Button
                            buttonStyle="default"
                            id="metadata-sources"
                            to={urls.sources()}
                          >
                            Sources
                          </Button>
                          <Button
                            buttonStyle="default"
                            id="metadata-collections"
                            to={urls.collections()}
                          >
                            Collections
                          </Button>
                          <Button
                            buttonStyle="primary"
                            id="filters"
                          >
                            Filters
                          </Button>
                        </ButtonGroup>
                        <div>
                          <SearchField
                            autoFocus
                            inputRef={this.searchField}
                            name="query"
                            onChange={getSearchHandlers().query}
                            onClear={getSearchHandlers().reset}
                            value={searchValue.query}
                          />
                          <Button
                            buttonStyle="primary"
                            disabled={!searchValue.query || searchValue.query === ''}
                            fullWidth
                            type="submit"
                          >
                            <FormattedMessage id="stripes-smart-components.search" />
                          </Button>
                        </div>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                        <FilterFilters
                          activeFilters={activeFilters.state}
                          filterHandlers={getFilterHandlers()}
                        />
                      </form>
                    </Pane>
                  }
                  <Pane
                    appIcon={<AppIcon app="finc-select" />}
                    defaultWidth="fill"
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
                    padContent={false}
                    paneTitle="Finc Select"
                    paneSub={this.renderResultsPaneSubtitle(source)}
                  >
                    <MultiColumnList
                      autosize
                      columnMapping={{
                        label: intl.formatMessage({ id: 'ui-finc-select.source.label' }),
                        sourceId: intl.formatMessage({ id: 'ui-finc-select.source.id' }),
                        status: intl.formatMessage({ id: 'ui-finc-select.source.status' }),
                        lastProcessed: intl.formatMessage({ id: 'ui-finc-select.source.lastProcessed' }),
                      }}
                      contentData={this.props.contentData}
                      formatter={this.resultsFormatter}
                      id="list-sources"
                      isEmptyMessage="no results"
                      isSelected={({ item }) => item.id === selectedRecordId}
                      onHeaderClick={onSort}
                      onRowClick={onSelectRow}
                      rowFormatter={this.rowFormatter}
                      // selectedRow={this.state.selectedItem}
                      totalCount={count}
                      virtualize
                      visibleColumns={['label', 'sourceId', 'status', 'lastProcessed']}
                    />
                  </Pane>
                  {this.props.children}
                </Paneset>
              );
            }
          }
        </SearchAndSortQuery>
      </div>
    );
  }
}

export default injectIntl(Filters);
