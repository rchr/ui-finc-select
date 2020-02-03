const urls = {
  sources: () => '/finc-select/metadata-sources',
  sourceView: id => `/finc-select/metadata-sources/${id}`,

  collections: () => '/finc-select/metadata-collections',
  collectionView: id => `/finc-select/metadata-collections/${id}`,

  // showAllCollections: (sourceId) => `/finc-select/metadata-collections?filters=mdSource.${sourceId}`,
  showAllCollections: (sourceId) => `/finc-select/metadata-collections?filters=mdSource.${sourceId},selected.yes,selected.no,permitted.yes,permitted.no,freeContent.undetermined,freeContent.no,freeContent.yes&query=`,
  // showSelectedCollections: (sourceId) => `/finc-select/metadata-collections?filters=mdSource.${sourceId},selected.yes`,
  showSelectedCollections: (sourceId) => `/finc-select/metadata-collections?filters=mdSource.${sourceId},selected.yes,permitted.yes,permitted.no,freeContent.undetermined,freeContent.no,freeContent.yes&query=`,

  filters: () => '/finc-select/filters',
  filterView: id => `/finc-select/filters/${id}`,
  filterEdit: id => `/finc-select/filters/${id}/edit`,
  filterCreate: () => '/finc-select/filters/create',
};

export default urls;
