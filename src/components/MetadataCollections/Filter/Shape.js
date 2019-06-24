import PropTypes from 'prop-types';

export const sourceShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

export const sourcesShape = PropTypes.arrayOf(sourceShape);

export const selectOptionShape = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

export const selectOptionsShape = PropTypes.arrayOf(selectOptionShape);
