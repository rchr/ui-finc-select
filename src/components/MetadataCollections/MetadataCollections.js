import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  withRouter,
} from 'react-router-dom';
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
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  Paneset,
  SearchField,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import CollectionFilters from './CollectionFilters';
import urls from '../DisplayUtils/urls';
import Navigation from '../Navigation/Navigation';

const defaultFilter = { state: { permitted: ['yes'], selected: ['yes'] }, string: 'permitted.yes,selected.yes' };
const defaultSearchString = { query: '' };

class MetadataCollections extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    collection: PropTypes.object,
    contentData: PropTypes.arrayOf(PropTypes.object),
    disableRecordCreation: PropTypes.bool,
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
    onNeedMoreData: PropTypes.func,
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
    selectedRecordId: PropTypes.string,
  };

  static defaultProps = {
    contentData: {},
    filterData: {},
    searchString: '',
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      filterPaneIsVisible: true,
      storedFilter: localStorage.getItem('fincSelectCollectionFilters') ? JSON.parse(localStorage.getItem('fincSelectCollectionFilters')) : defaultFilter,
      storedSearchString: localStorage.getItem('fincSelectCollectionSearchString') ? JSON.parse(localStorage.getItem('fincSelectCollectionSearchString')) : defaultSearchString,
    };
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

  resultsFormatter = {
    label: collection => collection.label,
    // mdSource: collection => collection.mdSource.name,
    mdSource: collection => _.get(collection, 'mdSource.name', '-'),
    permitted: collection => collection.permitted,
    selected: collection => collection.selected,
    filters: collection => this.getArrayElementsCommaSeparated(collection.filters),
    freeContent: collection => collection.freeContent,
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
      return `${urls.collectionView(id)}${this.props.searchString}`;
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
  renderResultsPaneSubtitle = (collection) => {
    if (collection) {
      const count = collection ? collection.totalCount() : 0;
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }

  renderNavigation = (id) => (
    <Navigation
      id={id}
    />
  );

  cacheFilter(activeFilters, searchValue) {
    localStorage.setItem('fincSelectCollectionFilters', JSON.stringify(activeFilters));
    localStorage.setItem('fincSelectCollectionSearchString', JSON.stringify(searchValue));
  }

  resetAll(getFilterHandlers, getSearchHandlers) {
    localStorage.removeItem('fincSelectCollectionFilters');
    localStorage.removeItem('fincSelectCollectionSearchString');

    // reset the filter state to default filters
    getFilterHandlers.state(defaultFilter.state);

    // reset the search query
    getSearchHandlers.state(defaultSearchString);

    this.setState({
      storedFilter: defaultFilter,
      storedSearchString: defaultSearchString,
    });

    return (this.props.history.push(`${urls.collections()}?filters=${defaultFilter.string}`));
  }

  handleClearSearch(getSearchHandlers, onSubmitSearch, searchValue) {
    localStorage.removeItem('fincSelectCollectionSearchString');

    searchValue.query = '';

    getSearchHandlers.state({
      query: '',
    });

    return onSubmitSearch;
  }

  handleChangeSearch(e, getSearchHandlers, onSubmitSearch, searchValue) {
    if (e === '') {
      localStorage.removeItem('fincSelectCollectionSearchString');

      searchValue.query = '';

      getSearchHandlers.state({
        query: '',
      });

      return onSubmitSearch;
    } else {
      getSearchHandlers.state({
        query: e,
      });
      return onSubmitSearch;
    }
  }

  getDisableReset(activeFilters, searchValue) {
    if (_.isEqual(activeFilters.state, defaultFilter.state) && searchValue.query === defaultSearchString.query) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { intl, queryGetter, querySetter, onNeedMoreData, onSelectRow, selectedRecordId, collection, filterData } = this.props;
    const count = collection ? collection.totalCount() : 0;
    const query = queryGetter() || {};
    const sortOrder = query.sort || '';

    return (
      <div data-test-collections>
        <SearchAndSortQuery
          initialFilterState={this.state.storedFilter.state}
          initialSearchState={this.state.storedSearchString}
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
              searchChanged,
              searchValue,
            }) => {
              const disableReset = this.getDisableReset(activeFilters, searchValue);
              const disableSearch = () => (searchValue.query === defaultSearchString.query);
              if (filterChanged || searchChanged) {
                this.cacheFilter(activeFilters, searchValue);
              }

              return (
                <Paneset>
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      data-test-collection-pane-filter
                      defaultWidth="18%"
                      id="pane-collectionfilter"
                      onClose={this.toggleFilterPane}
                      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                    >
                      <form onSubmit={onSubmitSearch}>
                        {this.renderNavigation('collection')}
                        <div>
                          <SearchField
                            autoFocus
                            id="collectionSearchField"
                            inputRef={this.searchField}
                            name="query"
                            onChange={(e) => this.handleChangeSearch(e.target.value, getSearchHandlers(), onSubmitSearch(), searchValue)}
                            onClear={() => this.handleClearSearch(getSearchHandlers(), onSubmitSearch(), searchValue)}
                            value={searchValue.query}
                          />
                          <Button
                            buttonStyle="primary"
                            disabled={disableSearch()}
                            fullWidth
                            id="collectionSubmitSearch"
                            type="submit"
                          >
                            <FormattedMessage id="stripes-smart-components.search" />
                          </Button>
                        </div>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset}
                          id="clickable-reset-all"
                          onClick={() => this.resetAll(getFilterHandlers(), getSearchHandlers())}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                        <CollectionFilters
                          activeFilters={activeFilters.state}
                          filterData={filterData}
                          filterHandlers={getFilterHandlers()}
                        />
                      </form>
                    </Pane>
                  }
                  <Pane
                    appIcon={<AppIcon app="finc-select" />}
                    data-test-collection-pane-results
                    defaultWidth="fill"
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
                    id="pane-collectionresults"
                    padContent={false}
                    paneTitle="Finc Select"
                    paneSub={this.renderResultsPaneSubtitle(collection)}
                  >
                    <MultiColumnList
                      autosize
                      columnMapping={{
                        label: intl.formatMessage({ id: 'ui-finc-select.collection.label' }),
                        mdSource: intl.formatMessage({ id: 'ui-finc-select.collection.mdSource' }),
                        permitted: intl.formatMessage({ id: 'ui-finc-select.collection.permitted' }),
                        selected: intl.formatMessage({ id: 'ui-finc-select.collection.selected' }),
                        filters: intl.formatMessage({ id: 'ui-finc-select.collection.filters' }),
                        freeContent: intl.formatMessage({ id: 'ui-finc-select.collection.freeContent' })
                      }}
                      contentData={this.props.contentData}
                      formatter={this.resultsFormatter}
                      id="list-collections"
                      isEmptyMessage="no results"
                      isSelected={({ item }) => item.id === selectedRecordId}
                      onHeaderClick={onSort}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={onSelectRow}
                      rowFormatter={this.rowFormatter}
                      sortDirection={
                        sortOrder.startsWith('-') ? 'descending' : 'ascending'
                      }
                      sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                      totalCount={count}
                      virtualize
                      visibleColumns={['label', 'mdSource', 'permitted', 'filters', 'freeContent']}
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

export default withRouter(injectIntl(MetadataCollections));
