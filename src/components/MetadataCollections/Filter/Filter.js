import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSet,
} from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import sourceShape from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

const FILTERS = {
  TEST: 'test'
};

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: sourceShape,
    activeFilters: PropTypes.object,
    // queryMutator: PropTypes.object
  };


  render() {
    const { activeFilters, onChange, sources } = this.props;

    return (
      <AccordionSet>
        <FincCheckboxFilter
          // activeFilters={activeFilters[FILTERS.RECEIPT_STATUS]}
          closedByDefault={false}
          id={FILTERS.RECEIPT_STATUS}
          labelId="finc-select.filter.usagePermitted"
          name={FILTERS.RECEIPT_STATUS}
          onChange={onChange}
          // options={RECEIPT_STATUS_FILTER_OPTIONS}
        />
        <SourceFilter
          // activeFilters={activeFilters[FILTERS.TEST]}
          name={FILTERS.TEST}
          onChange={onChange}
          sources={sources}
        />
      </AccordionSet>
    );
  }
}

export default Filter;
