import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';

import {
  Button,
  Icon,
  Modal,
  MultiColumnList,
  Pane,
  Paneset,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';
// import SearchForm from './SearchForm';
import CollectionFilters from '../../MetadataCollections/CollectionFilters';
import css from './CollectionsModal.css';

class CollectionsModal extends React.Component {
  // static propTypes = {
  //   intl: intlShape.isRequired,
  //   open: PropTypes.bool.isRequired,
  //   onClose: PropTypes.func.isRequired,
  //   availableCollections: PropTypes.arrayOf(PropTypes.object),
  //   filterData: PropTypes.shape({
  //     mdSources: PropTypes.array,
  //   }),
  //   queryGetter: PropTypes.func,
  //   querySetter: PropTypes.func,
  // };

  // static defaultProps = {
  //   filterData: {},
  //   availableCollections:  {},
  // };

  constructor(props) {
    super(props);

    this.state = {
      filters: '',
      filterPaneIsVisible: true,
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
    mdSource: collection => _.get(collection, 'mdSource.name', '-'),
    permitted: collection => collection.permitted,
    selected: collection => collection.selected,
    filters: collection => this.getArrayElementsCommaSeparated(collection.filters),
    freeContent: collection => collection.freeContent,
  };

  render() {
    const {
      filters,
    } = this.state;
    const { intl, open, onClose, availableCollections, filterData, queryGetter, querySetter } = this.props;
    // const FilterGroupsConfig = [];
    // const count = availableCollections ? availableCollections.totalCount() : 0;

    return (
      <Modal
        open={open}
        id="collections-modal"
        dismissible
        label={<FormattedMessage id="ui-finc-select.filter.collections.modal.header" />}
        size="large"
        showHeader
        onClose={onClose}
        contentClass={css.modalContent}
        footer={
          <div>
            <Button
              id="clickable-collections-modal-cancel"
              data-test-collections-modal-cancel
              onClick={onClose}
              marginBottom0
            >
              <FormattedMessage id="ui-finc-select.filter.collections.modal.cancel" />
            </Button>
            <Button
              id="clickable-collections-modal-save"
              data-test-collections-modal-save
              marginBottom0
              buttonStyle="primary"
              onClick={this.onSave}
            >
              <FormattedMessage id="ui-finc-select.filter.collections.modal.save" />
            </Button>
          </div>
        }
      >
        <div>
          <Paneset>
            {
              this.state.filterPaneIsVisible &&
              <Pane
                defaultWidth="30%"
                paneTitle={<FormattedMessage id="ui-finc-select.filter.collections.modal.search.header" />}
              >
                {/* <form onSubmit={onSubmitSearch}> */}
                <form>
                  <div>
                    <FormattedMessage id="ui-finc-select.collection.searchInputLabel">
                      {ariaLabel => (
                        <SearchField
                          ariaLabel={ariaLabel}
                          autoFocus
                          id="collectionSearchField"
                          inputRef={this.searchField}
                          name="query"
                          // onChange={(e) => {
                          //   if (e.target.value) {
                          //     this.handleChangeSearch(e.target.value, getSearchHandlers());
                          //   } else {
                          //     this.handleClearSearch(getSearchHandlers(), onSubmitSearch(), searchValue);
                          //   }
                          // }}
                          // onClear={() => this.handleClearSearch(getSearchHandlers(), onSubmitSearch(), searchValue)}
                          // value={searchValue.query}
                        />
                      )}
                    </FormattedMessage>
                    <Button
                      buttonStyle="primary"
                      // disabled={disableSearch()}
                      fullWidth
                      id="collectionSubmitSearch"
                      type="submit"
                    >
                      <FormattedMessage id="stripes-smart-components.search" />
                    </Button>
                  </div>
                  <Button
                    buttonStyle="none"
                    // disabled={disableReset}
                    id="clickable-reset-all"
                    // onClick={() => this.resetAll(getFilterHandlers(), getSearchHandlers())}
                  >
                    <Icon icon="times-circle-solid">
                      <FormattedMessage id="stripes-smart-components.resetAll" />
                    </Icon>
                  </Button>
                  <CollectionFilters
                    // activeFilters={activeFilters.state}
                    filterData={filterData}
                    // filterHandlers={getFilterHandlers()}
                  />
                </form>
              </Pane>
            }
            <Pane
              paneTitle={<FormattedMessage id="ui-finc-select.filter.collections.modal.list.pane.header" />}
              paneSub={
                <FormattedMessage
                  id="ui-finc-select.filter.collections.modal.list.pane.subheader"
                  values={{ amount: availableCollections.length }}
                />
              }
              defaultWidth="fill"
            >
              <div>
                <MultiColumnList
                  columnMapping={{
                    label: intl.formatMessage({ id: 'ui-finc-select.collection.label' }),
                    mdSource: intl.formatMessage({ id: 'ui-finc-select.collection.mdSource' }),
                    permitted: intl.formatMessage({ id: 'ui-finc-select.collection.permitted' }),
                    selected: intl.formatMessage({ id: 'ui-finc-select.collection.selected' }),
                    filters: intl.formatMessage({ id: 'ui-finc-select.collection.filters' }),
                    freeContent: intl.formatMessage({ id: 'ui-finc-select.collection.freeContent' })
                  }}
                  contentData={availableCollections}
                  formatter={this.resultsFormatter}
                  id="list-collections"
                  // isEmptyMessage="no results"
                  // isSelected={({ item }) => item.id === selectedRecordId}
                  // onHeaderClick={onSort}
                  // onRowClick={onSelectRow}
                  // rowFormatter={this.rowFormatter}
                  // sortDirection={
                  //   sortOrder.startsWith('-') ? 'descending' : 'ascending'
                  // }
                  // sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                  // totalCount={count}
                  visibleColumns={['label', 'mdSource', 'permitted', 'filters', 'freeContent']}
                />
              </div>
            </Pane>
          </Paneset>
        </div>
      </Modal>
    );
  }
}

CollectionsModal.propTypes = {
  intl: intlShape.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  availableCollections: PropTypes.arrayOf(PropTypes.object),
  filterData: PropTypes.shape({
    mdSources: PropTypes.array,
  }),
  queryGetter: PropTypes.func,
  querySetter: PropTypes.func,
};

CollectionsModal.defaultProps = {
  filterData: {},
  availableCollections:  {},
  searchString: '',
};

export default injectIntl(CollectionsModal);
