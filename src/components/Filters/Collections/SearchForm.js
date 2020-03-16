import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  FilterGroups,
  SearchField,
  Icon,
} from '@folio/stripes/components';

import filterConfigData from '../../MetadataCollections/filterConfigData';
// import css from './SearchForm.css';

const SearchForm = (props) => {
  const {
    onSubmitSearch,
    onChangeFilter,
    filters,
    resetSearchForm,
    onClearFilter,
  } = props;
  const [searchText, setSearchText] = useState('');
  const onFormSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSubmitSearch(searchText);
  };
  const onResetSearchForm = () => {
    setSearchText('');
    resetSearchForm();
  };

  return (
    <form onSubmit={onFormSubmit}>
      {/* className={css.searchGroupWrap} */}
      <div>
        <SearchField
          data-test-search-field
          aria-label="user search"
          name="query"
          onChange={({ target: { value } }) => { setSearchText(value); }}
          // className={css.searchField}
          value={searchText}
          autoFocus
        />
        <Button
          data-test-submit-button
          type="submit"
          buttonStyle="primary"
          fullWidth
          disabled={isEmpty(searchText)}
          marginBottom0
        >
          <FormattedMessage id="ui-users.search" />
        </Button>
      </div>
      <div>
        <Button
          // buttonClass={css.resetButton}
          data-test-reset-all-button
          buttonStyle="none"
          onClick={onResetSearchForm}
        >
          <Icon icon="times-circle-solid">
            <FormattedMessage id="ui-users.permissions.modal.search.resetAll" />
          </Icon>
        </Button>
      </div>
      <FilterGroups
        config={filterConfigData}
        filters={filters}
        onChangeFilter={onChangeFilter}
        onClearFilter={onClearFilter}
      />
    </form>
  );
};

SearchForm.propTypes = {
  filters: PropTypes.object.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  resetSearchForm: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    mdSources: PropTypes.array,
  }),
};

export default SearchForm;
