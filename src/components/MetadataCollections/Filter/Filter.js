import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSet,
} from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import sourceShape from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

const FILTERS = {
  TEST: 'test',
  PERMITTED: 'permitted'
};


const DEFAULT_FILTERS = [
  'permitted.no'
];

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: sourceShape,
    activeFilters: PropTypes.object,
    queryMutator: PropTypes.object
  };


  componentDidMount() {
    const { queryMutator } = this.props;
    const filters = DEFAULT_FILTERS.join(',');

    queryMutator.update({ filters });
  }


  render() {
    const { activeFilters, onChange, sources } = this.props;

    const permittedOptions = [
      { label: 'Yes', value: 'yes' },
      { label: 'Yes (restricted)', value: 'yes restricted' },
      { label: 'No', value: 'no' }
    ];
    const permittedActive = [];


    return (
      <AccordionSet>
        <SourceFilter
          // activeFilters={activeFilters[FILTERS.TEST]}
          name={FILTERS.TEST}
          onChange={onChange}
          sources={sources}
        />
        <FincCheckboxFilter
          activeFilters={permittedActive}
          closedByDefault={false}
          id="permitted"
          labelId="ui-finc-select.collection.permitted"
          name="permitted"
          onChange={onChange}
          options={permittedOptions}

        />
        <FincCheckboxFilter
          // activeFilters={activeFilters[FILTERS.TEST]}
          closedByDefault={1}
          id="selected"
          labelId="ui-finc-select.collection.selected"
          name="selected"
          onChange={onChange}
          // options={STATUS_FILTER_OPTIONS}
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
