const filterConfig = [
  {
    label: 'Implementation Status',
    name: 'status',
    cql: 'status',
    values: [
      { name: 'Active', cql: 'active' },
      { name: 'Wish', cql: 'wish' },
      { name: 'Negotiation', cql: 'negotiation' },
      { name: 'Technical implementation', cql: 'technical implementation' },
      { name: 'Deactivated', cql: 'deactivated' },
      { name: 'Terminated', cql: 'terminated' }
    ],
  }
];

export default filterConfig;
