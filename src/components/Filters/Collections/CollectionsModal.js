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
  Modal,
  MultiColumnList,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import SearchForm from './SearchForm';
// import CollectionFilters from '../../MetadataCollections/CollectionFilters';
import css from './CollectionsModal.css';

class CollectionsModal extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    availableCollections: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
  };

  static defaultProps = {
    filterData: {},
    availableCollections:  {},
  };

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
    const { intl, open, onClose, availableCollections, filterData } = this.props;
    const FilterGroupsConfig = [];

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
            <Pane
              defaultWidth="30%"
              paneTitle={<FormattedMessage id="ui-finc-select.filter.collections.modal.search.header" />}
            >
              <SearchForm
                config={FilterGroupsConfig}
                filterData={filterData}
                onClearFilter={this.onClearFilter}
                onSubmitSearch={this.onSubmitSearch}
                onChangeFilter={this.onChangeFilter}
                resetSearchForm={this.resetSearchForm}
              />
            </Pane>
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

export default stripesConnect(injectIntl(CollectionsModal));
