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

// import Filter from './Filter/Filter';
// import {
//   handleFilterChange,
//   getActiveFilters
// } from './Filter/Util';

import urls from '../DisplayUtils/urls';
import CollectionFilters from './CollectionFilters';

class MetadataCollections extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    collection: PropTypes.object,
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
    selectedRecordId: PropTypes.string,
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
  };

  static defaultProps = {
    filterData: {},
    contentData: {},
    searchString: '',
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      filterPaneIsVisible: true,
    };

    // this.getActiveFilters = getActiveFilters.bind(this);
    // this.handleFilterChange = handleFilterChange.bind(this);
    // this.renderFilters = this.renderFilters.bind(this);
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

  // renderFilters(onChange) {
  //   const { resources } = this.props;
  //   const mdSource = _.get(resources, 'mdSource.records', []);
  //   const freeContentData = [
  //     { label: 'Yes', value: 'yes' },
  //     { label: 'No', value: 'no' },
  //     { label: 'Undetermined', value: 'undetermined' }
  //   ];
  //   const booleanData = [
  //     { label: 'Yes', value: 'yes' },
  //     { label: 'No', value: 'no' }
  //   ];

  //   return (
  //     <Filter
  //       activeFilters={this.getActiveFilters()}
  //       onChange={onChange}
  //       queryMutator={this.props.mutator.query}
  //       // get data for source-filter from okapi
  //       mdSource={mdSource}
  //       // get bool-data for permitted and selected
  //       permitted={booleanData}
  //       selected={booleanData}
  //       freeContent={freeContentData}
  //     />
  //   );
  // }

  render() {
    const { intl, queryGetter, querySetter, onSelectRow, selectedRecordId, collection, filterData } = this.props;
    const count = collection ? collection.totalCount() : 0;

    return (
      <SearchAndSortQuery
        initialFilterState={{ permitted: ['yes'], selected: ['yes'] }}
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
                          buttonStyle="primary"
                          id="metadata-collections"
                        >
                          Collections
                        </Button>
                        <Button
                          buttonStyle="default"
                          id="metadata-filters"
                          // to={urls.filters()}
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
                      <CollectionFilters
                        activeFilters={activeFilters.state}
                        filterHandlers={getFilterHandlers()}
                        filterData={filterData}
                      />
                    </form>
                  </Pane>
                }
                <Pane
                  appIcon={<AppIcon app="finc-config" />}
                  defaultWidth="fill"
                  firstMenu={this.renderResultsFirstMenu(activeFilters)}
                  // lastMenu={this.renderResultsLastMenu()}
                  padContent={false}
                  paneTitle="Finc Config"
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
                    onRowClick={onSelectRow}
                    rowFormatter={this.rowFormatter}
                    // selectedRow={this.state.selectedItem}
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
    );
  }
}

export default injectIntl(MetadataCollections);
