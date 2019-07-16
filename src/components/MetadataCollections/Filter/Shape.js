import PropTypes from 'prop-types';

export const sourceShape = PropTypes.shape({
  id: PropTypes.string,
  // it is called mdSource.name in fincSelectMetadataCollection.json
  // name: PropTypes.string,

  // its called label in tinyMetadataSource.json
  label: PropTypes.string,
});

export const sourcesShape = PropTypes.arrayOf(sourceShape);

export const selectOptionShape = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

export const selectOptionsShape = PropTypes.arrayOf(selectOptionShape);
