import { faker } from '@bigtest/mirage';

import Factory from './application';

export default Factory.extend({
  id: () => faker.random.uuid(),
  label: (i) => 'COLLECTION ' + i,
  description: (i) => 'description' + i,
  // mdSource: {
  //   id: 'mdSource id',
  //   name: 'mdSource name'
  // },
  metadataAvailable: '',
  usageRestricted: '',
  permitted: '',
  freeContent: '',
  lod: {
    publication: '',
    note: ''
  },
  collectionId: '',
  tickets: [],
  contentFiles: [],
  solrMegaCollections: [],
  selected: '',
});
