const urls = {
  sources: () => '/finc-select/metadata-sources',
  sourceView: id => `/finc-select/metadata-sources/${id}`,

  collections: () => '/finc-select/metadata-collections',
  collectionView: id => `/finc-select/metadata-collections/${id}`,

  filters: () => '/finc-select/filters',
  filterView: id => `/finc-select/filters/${id}`,
};

export default urls;
