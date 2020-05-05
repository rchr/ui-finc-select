export default (filterId, collectionIds, okapi) => {
  return fetch(`${okapi.url}/finc-select/filters/${filterId}/collections`, {
    method: 'PUT',
    headers: {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'collectionIds': collectionIds
    })
  });
};
