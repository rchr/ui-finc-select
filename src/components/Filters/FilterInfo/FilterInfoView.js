import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  KeyValue,
  Row
} from '@folio/stripes/components';

class FilterInfoView extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  render() {
    const { filter } = this.props;

    return (
      <React.Fragment>
        <Row>
          <KeyValue
            label={<FormattedMessage id="ui-finc-select.filter.label" />}
            value={_.get(filter, 'label', '-')}
          />
        </Row>
        <Row>
          <KeyValue
            label={<FormattedMessage id="ui-finc-select.filter.type" />}
            value={_.get(filter, 'type', '-')}
          />
        </Row>
      </React.Fragment>
    );
  }
}
export default FilterInfoView;
