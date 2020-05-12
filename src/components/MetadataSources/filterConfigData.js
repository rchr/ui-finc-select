const filterConfig = [
  {
    label: 'Implementation Status',
    name: 'status',
    cql: 'status',
    values: [
      { name: 'Active', cql: 'active' },
      { name: 'Wish', cql: 'wish' },
      { name: 'Impossible', cql: 'impossible' },
      { name: 'Negotiation', cql: 'negotiation' },
      { name: 'Technical implementation', cql: 'technical implementation' },
      { name: 'Trial', cql: 'trial' },
      { name: 'Terminated', cql: 'terminated' }
    ],
  },
  {
    label: 'Selected',
    name: 'selected',
    cql: 'selected',
    values: [
      { name: 'All', cql: 'all' },
      { name: 'Some', cql: 'some' },
      { name: 'None', cql: 'none' },
    ],
  }
];

export default filterConfig;
