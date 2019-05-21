import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  KeyValue,
  Row
} from '@folio/stripes/components';

class SourceManagementView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  render() {
    const { metadataSource } = this.props;

    return (
      <React.Fragment>
        <div id="id">
          {/* TODO: selectedCollections */}
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.selectedCollections" />}
              // value={_.get(metadataSource, 'selectedCollections', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.organization" />}
              value={_.get(metadataSource, 'vendor.name', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceManagementView;
