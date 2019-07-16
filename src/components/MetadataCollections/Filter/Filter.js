import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionSet
} from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import sourcesShape from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

// set filter, which will be set by default -> NOT POSSIBLE! With default filter the functions showAllCollections and others are not working!
// const DEFAULT_FILTERS = [
//   // 'freeContent.no',
// ];

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeFilters: PropTypes.object,
    // queryMutator: PropTypes.object,
    mdSource: sourcesShape,
    permitted: PropTypes.bool,
    selected: PropTypes.bool,
    freeContent: PropTypes.arrayOf(PropTypes.string)
  };

  componentDidMount() {
    // const { queryMutator } = this.props;
    // const filters = DEFAULT_FILTERS.join(',');
    // queryMutator.update({ filters });
  }

  render() {
    const { onChange, permitted, selected, freeContent } = this.props;

    return (
      <AccordionSet>
        <SourceFilter
          // displayClearButton={activeFilters[tinySources].length > 0}
          // header={FilterAccordionHeader}
          activeFilters={this.props.activeFilters.mdSource}
          // name will be set to url
          name="mdSource"
          onChange={onChange}
          // set data for the select-box
          sources={this.props.mdSource}
        />
        {/* freeContent is not necessary here!
          its just a working filter example until permitted and selected will be working!!! */}
        <FincCheckboxFilter
          activeFilters={this.props.activeFilters.freeContent}
          closedByDefault={false}
          id="freeContent"
          labelId="ui-finc-select.collection.freeContent"
          // name will be set to url
          name="freeContent"
          onChange={onChange}
          // set data for the check-boxes
          options={freeContent}
        />
        <FincCheckboxFilter
          activeFilters={this.props.activeFilters.permitted}
          closedByDefault={false}
          id="permitted"
          labelId="ui-finc-select.collection.permitted"
          name="permitted"
          onChange={onChange}
          options={permitted}
        />
        <FincCheckboxFilter
          activeFilters={this.props.activeFilters.selected}
          closedByDefault={1}
          id="selected"
          labelId="ui-finc-select.collection.selected"
          name="selected"
          onChange={onChange}
          options={selected}
        />
        {/* <FincCheckboxFilter
          // activeFilters={this.props.activeFilters[activeFilters]}
          closedByDefault={1}
          id="activeFilters"
          labelId="ui-finc-select.collection.filters"
          name="activeFilters"
          onChange={activeFilters}
          // options={}
        /> */}
      </AccordionSet>
    );
  }
}

export default Filter;
