import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Headline,
  KeyValue,
  List,
  Row,
} from '@folio/stripes/components';

import SelectUnselect from './SelectUnselect';
import urls from '../../DisplayUtils/urls';

import BasicCss from '../../BasicStyle.css';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.connectedSelectUnselect = this.props.stripes.connect(SelectUnselect);
  }

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
    const { metadataCollection, id, stripes } = this.props;
    const collectionId = _.get(metadataCollection, 'id', '-');
    const permitted = _.get(metadataCollection, 'permitted', '-');
    const selectedInitial = _.get(metadataCollection, 'selected');

    // get id and name of the source out of the fields, saved in the current collection
    const sourceId = _.get(metadataCollection, 'mdSource.id', '-');
    const sourceName = _.get(metadataCollection, 'mdSource.name', '-');
    // set the complete source link with name and status
    const sourceLink = (
      <React.Fragment>
        <Link to={{
          pathname: `${urls.sourceView(sourceId)}`,
          // search: `?filters=status.${sourceStatus}`
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
          {/* <Row>
            { this.renderList('filters') }
          </Row> */}
          <Row>
            <this.connectedSelectUnselect
              stripes={stripes}
              selectedInitial={selectedInitial}
              collectionId={collectionId}
              permitted={permitted}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
