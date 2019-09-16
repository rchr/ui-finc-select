import React from 'react';
import PropTypes from 'prop-types';
import { AccordionSet } from '@folio/stripes/components';
import SourceFilter from './SourceFilter';
import { sourcesShape } from './Shape';
import FincCheckboxFilter from './FincCheckboxFilter';

class Filter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeFilters: PropTypes.object,
    mdSource: sourcesShape,
    permitted: PropTypes.string,
    selected: PropTypes.string,
    freeContent: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { onChange, permitted, selected, freeContent } = this.props;

    return (
      <AccordionSet>
        <SourceFilter
          activeFilters={this.props.activeFilters.mdSource}
          // name will be set to url
          name="mdSource"
          onChange={onChange}
          // set data for the select-box
          sources={this.props.mdSource}
        />
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
          closedByDefault={false}
          id="selected"
          labelId="ui-finc-select.collection.selected"
          name="selected"
          onChange={onChange}
          options={selected}
        />
        {/* TODO: Active filter is missing here */}
      </AccordionSet>
    );
  }
}

export default Filter;
