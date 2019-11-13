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
import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import urls from '../DisplayUtils/urls';
import SourceFilters from './SourceFilters';

const searchableIndexes = [
  { label: 'All', value: '', makeQuery: term => `(label="${term}*" or sourceId="${term}*")` },
  { label: 'Source Name', value: 'label', makeQuery: term => `(label="${term}*")` },
  { label: 'Source ID', value: 'sourceId', makeQuery: term => `(sourceId="${term}*")` }
];

class MetadataSources extends React.Component {
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
    label: source => source.label,
    sourceId: source => source.sourceId,
    status: source => source.status,
    lastProcessed: source => source.lastProcessed,
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

  // button for creating a new record
  renderResultsLastMenu() {
    if (this.props.disableRecordCreation) {
      return null;
    }

    return (
      <IfPermission perm="ui-licenses.licenses.edit">
        <PaneMenu>
          <FormattedMessage id="ui-finc-select.source.form.createSource">
            {ariaLabel => (
              <Button
                aria-label={ariaLabel}
                buttonStyle="primary"
                id="clickable-new-source"
                marginBottom0
                to={`${urls.sourceCreate()}${this.props.searchString}`}
              >
                <FormattedMessage id="stripes-smart-components.new" />
              </Button>
            )}
          </FormattedMessage>
        </PaneMenu>
      </IfPermission>
    );
  }

  render() {
    const { intl, queryGetter, querySetter, onChangeIndex, onSelectRow, selectedRecordId, source } = this.props;
    const count = source ? source.totalCount() : 0;

    return (
      <SearchAndSortQuery
        initialFilterState={{ status: ['active', 'technical implementation'] }}
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
                          buttonStyle="primary"
                          id="metadata-sources"
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
                          // add values for search-selectbox
                          onChangeIndex={onChangeIndex}
                          searchableIndexes={searchableIndexes}
                          searchableIndexesPlaceholder={null}
                          selectedIndex={_.get(this.props.contentData, 'qindex')}
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
                      <SourceFilters
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
                  lastMenu={this.renderResultsLastMenu()}
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
    );
  }
}

export default injectIntl(MetadataSources);
