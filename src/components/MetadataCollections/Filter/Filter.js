import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSet,
  FilterAccordionHeader
} from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import sourceShape from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

// set filter, which will be set by default
const DEFAULT_FILTERS = [
  'freeContent.no',
];

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeFilters: PropTypes.object,
    queryMutator: PropTypes.object,
    tinySources: PropTypes.object,
    permitted: PropTypes.bool,
    selected: PropTypes.bool,
    freeContent: PropTypes.arrayOf(PropTypes.string)
  };

  componentDidMount() {
    const { queryMutator } = this.props;
    const filters = DEFAULT_FILTERS.join(',');

    queryMutator.update({ filters });
  }

  render() {
    const { activeFilters, onChange, tinySources, permitted, selected, freeContent } = this.props;

    return (
      <AccordionSet>
        <SourceFilter
          // displayClearButton={activeFilters[tinySources].length > 0}
          header={FilterAccordionHeader}
          activeFilters={activeFilters[tinySources]}
          name={tinySources}
          onChange={onChange}
          // set data for the selsct-box
          sources={this.props.tinySources}
        />
        <FincCheckboxFilter
          header={FilterAccordionHeader}
          activeFilters={activeFilters[freeContent]}
          closedByDefault={false}
          id="freeContent"
          labelId="ui-finc-select.collection.freeContent"
          // name will be set to url
          name="freeContent"
          onChange={onChange}
          options={freeContent}
        />
        <FincCheckboxFilter
          // activeFilters={permittedActive}
          closedByDefault={false}
          id="permitted"
          labelId="ui-finc-select.collection.permitted"
          name="permitted"
          onChange={onChange}
          options={permitted}
        />
        <FincCheckboxFilter
          // activeFilters={activeFilters[FILTERS.TEST]}
          closedByDefault={1}
          id="selected"
          labelId="ui-finc-select.collection.selected"
          name="selected"
          onChange={onChange}
          options={selected}
        />
        <FincCheckboxFilter
          // activeFilters={activeFilters[FILTERS.STATUS]}
          closedByDefault={1}
          id="activeFilters"
          labelId="ui-finc-select.collection.filters"
          name="activeFilters"
          onChange={onChange}
          // options={STATUS_FILTER_OPTIONS}
        />
      </AccordionSet>
    );
  }
}

export default Filter;
