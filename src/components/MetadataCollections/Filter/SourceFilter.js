import React from 'react';

import SelectionFilter from './SelectionFilter';
import { getSourcesOptions } from './Util';
import { sourcesShape } from './Shape';

const SourceFilter = ({ sources, ...rest }) => {
  const options = getSourcesOptions(sources);
  const labelId = 'ui-finc-select.collection.filter.sources';

  return (
    <SelectionFilter
      {...rest}
      labelId={labelId}
      options={options}
    />
  );
};

SourceFilter.propTypes = {
  sources: sourcesShape,
};

export default SourceFilter;
