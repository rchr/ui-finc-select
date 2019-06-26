export const createClearFilterHandler = (onChange, name) => () => {
  onChange({ name, values: [] });
};

export const createOnChangeSelectionFilter = (onChange, filterName) => {
  return value => onChange({ name: filterName, values: [value] });
};

export const getSourcesOptions = (sources = []) => sources.map(source => ({
  value: source.id,
  label: source.name,
}));

export const TEST = {
  type: 'okapi',
  path: 'finc-select/metadata-collections',
  records: 'fincSelectMetadataCollections'
};

// export function getActiveFilters() {
//   const { query } = this.props.resources;

//   if (!query || !query.filters) return {};

//   return query.filters
//     .split(',')
//     .reduce((filterMap, currentFilter) => {
//       const [name, value] = currentFilter.split('.');

//       if (!Array.isArray(filterMap[name])) {
//         filterMap[name] = [];
//       }

//       filterMap[name].push(value);

//       return filterMap;
//     }, {});
// }
