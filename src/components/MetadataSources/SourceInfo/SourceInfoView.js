import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  KeyValue,
  Row
} from '@folio/stripes/components';

class SourceInfoView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
    id: PropTypes.string,
  };

  render() {
    const { metadataSource, id } = this.props;

    return (
      <React.Fragment>
        <div id={id}>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.label" />}
              value={_.get(metadataSource, 'label', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.description" />}
              value={_.get(metadataSource, 'description', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.status" />}
              value={_.get(metadataSource, 'status', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceInfoView;
