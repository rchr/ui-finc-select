import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';

import BasicCss from '../../BasicStyle.css';

class SourceTechnicalView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
  };

  renderList = (values) => {
    const { metadataSource } = this.props;

    if (!metadataSource) {
      return 'no values';
    } else {
      const valueItems = metadataSource[values];
      const valueFormatter = (valueItem) => (<li key={valueItem}>{valueItem}</li>);
      const isEmptyMessage = 'No items to show';

      return (
        <List
          items={valueItems}
          itemFormatter={valueFormatter}
          isEmptyMessage={isEmptyMessage}
        />
      );
    }
  }

  render() {
    const { metadataSource } = this.props;

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.lastProcessed" />}
              value={_.get(metadataSource, 'lastProcessed', '-')}
            />
          </Row>
          {/* TICKET is repeatable */}
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-select.source.tickets" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('tickets') }
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.sourceId" />}
              value={_.get(metadataSource, 'sourceId', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceTechnicalView;
