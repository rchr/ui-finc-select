import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSet,
} from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import sourceShape from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

// const FILTERS = {
//   TEST: 'test',
//   PERMITTED: 'permitted'
// };

const DEFAULT_FILTERS = [
  // 'permitted.no'
];

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeFilters: PropTypes.object,
    queryMutator: PropTypes.object,
    tinySources: PropTypes.object,
    permitted: PropTypes.bool,
    selected: PropTypes.bool
  };

  componentDidMount() {
    const { queryMutator } = this.props;
    const filters = DEFAULT_FILTERS.join(',');

    queryMutator.update({ filters });
  }

  render() {
    const { activeFilters, onChange, tinySources, permitted, selected } = this.props;
    const permittedActive = [];

    return (
      <AccordionSet>
        <SourceFilter
          // activeFilters={activeFilters[FILTERS.TEST]}
          name={tinySources}
          onChange={onChange}
          sources={this.props.tinySources}
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
