const urls = {
  sources: () => '/finc-select/metadata-sources',
  sourceView: id => `/finc-select/metadata-sources/${id}`,
  sourceEdit: id => `/finc-select/metadata-sources/${id}/edit`,
  sourceCreate: () => '/finc-select/metadata-sources/create',

  collections: () => '/finc-select/metadata-collections',
  collectionView: id => `/finc-select/metadata-collections/${id}`,
  collectionEdit: id => `/finc-select/metadata-collections/${id}/edit`,
  collectionCreate: () => '/finc-select/metadata-collections/create',
};

export default urls;
