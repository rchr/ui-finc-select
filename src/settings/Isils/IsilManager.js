import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { EntryManager } from '@folio/stripes/smart-components';
import IsilDetails from './IsilDetails';
import IsilForm from './IsilForm';

class IsilManager extends React.Component {
  static manifest = Object.freeze({
    isils: {
      type: 'okapi',
      records: 'fincConfigIsils',
      path: 'finc-config/isils',
      resourceShouldRefresh: true
    }
  });

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.cIsilForm = props.stripes.connect(IsilForm);
    this.cIsilDetails = props.stripes.connect(IsilDetails);
  }

  render() {
    return (null);
  }
}

export default IsilManager;
