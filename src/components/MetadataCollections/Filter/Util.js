export const createClearFilterHandler = (onChange, name) => () => {
  onChange({ name, values: [] });
};

export const createOnChangeSelectionFilter = (onChange, filterName) => {
  return value => onChange({ name: filterName, values: [value] });
};

// getting data from tinyMetadataSource.json -> label instead of name ?!
export const getSourcesOptions = (sources = []) => sources.map(source => ({
  value: source.id,
  label: source.label,
}));

export const TEST = {
  type: 'okapi',
  path: 'finc-select/metadata-collections',
  records: 'fincSelectMetadataCollections'
};

// vgl ui-orders
export function handleFilterChange({ name, values }) { // example: name="freeContent", values=["undetermined"]
  const { mutator } = this.props;

  const newFilters = {
    ...this.getActiveFilters(),
    [name]: values,
  };

  const filters = Object.keys(newFilters)
    .map((filterName) => {
      return newFilters[filterName]
        .map((filterValue) => `${filterName}.${filterValue}`)
        .join(',');
    })
    .filter(filter => filter)
    .join(',');

  mutator.query.update({ filters });
}

// vgl ui-orders
// get current url-query with their filters (before last click on filter)
export function getActiveFilters() {
  const { query } = this.props.resources;

  if (!query || !query.filters) return {};

  return query.filters
    .split(',')
    .reduce((filterMap, currentFilter) => {
      const [name, value] = currentFilter.split('.');

      if (!Array.isArray(filterMap[name])) {
        filterMap[name] = [];
      }

      filterMap[name].push(value);

      return filterMap;
    }, {});
}
