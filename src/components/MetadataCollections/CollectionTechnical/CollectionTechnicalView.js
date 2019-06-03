import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';
import BasicCss from '../../BasicStyle.css';

class CollectionTechnicalView extends React.Component {
  static propTypes = {
    metadataCollection: PropTypes.object.isRequired
  };

  render() {
    const { metadataCollection } = this.props;
    const isEmptyMessage = 'No items to show';
    // set values for tickets
    const ticketsItems = metadataCollection.tickets;
    const ticketsFormatter = (ticketsItem) => (<li key={ticketsItem}>{ticketsItem}</li>);

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.collection.generalNotes" />}
              value={_.get(metadataCollection, 'generalNotes', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.collection.facetLabel" />}
              value={_.get(metadataCollection, 'facetLabel', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-select.collection.tickets" /></Headline>
          </Row>
          <Row>
            <List
              items={ticketsItems}
              itemFormatter={ticketsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionTechnicalView;
