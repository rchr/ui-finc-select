import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';

import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';

// import SelectUnselect from './SelectUnselect';
import urls from '../../DisplayUtils/urls';

import BasicCss from '../../BasicStyle.css';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object,
    sourceElement: PropTypes.object,
  };

  renderList = (values) => {
    const { metadataCollection } = this.props;

    if (!metadataCollection) {
      return 'no values';
    } else {
      const valueItems = metadataCollection[values];
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
    const { metadataCollection, id, sourceElement } = this.props;
    // // get the one source and all its information (which has the source ID saved in the collection)
    // const sourceElement = this.getSourceElement(sourceId, sourceData);
    const sourceId = _.get(sourceElement, 'id', '-');
    // // get the name of the source
    const sourceName = _.get(sourceElement, 'label', '-');
    // // get the status of the source for setting filter in url
    const sourceStatus = _.get(sourceElement, 'status', '-');
    // // set the complete source link with name and status
    const sourceLink = (
      <React.Fragment>
        <Link to={{
          pathname: `${urls.sourceView(sourceId)}`,
          search: `?filters=status.${sourceStatus}`
        }}
        >
          {sourceName}
        </Link>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div id={id}>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.collection.label" />}
              value={_.get(metadataCollection, 'label', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.collection.mdSource" />}
              value={sourceLink}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.collection.permitted" />}
              value={_.get(metadataCollection, 'permitted', '-')}
            />
          </Row>
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-select.collection.filters" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('filters') }
          </Row>
          <Row>
            TODO: Select Unselect
            {/* <this.connectedSelectUnselect
              stripes={stripes}
              selectedInitial={_.get(metadataCollection, 'selected')}
              collectionId={collectionId}
              permitted={permitted}
            /> */}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
