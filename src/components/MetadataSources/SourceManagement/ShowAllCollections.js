import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import {
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';
import {
  injectIntl
} from 'react-intl';
import packageInfo from '../../../../package';

class ShowAllCollections extends React.Component {
  static propTypes = {
    sourceId: PropTypes.string.isRequired,
    resources: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.string,
    }),
  };

  handleClick(sourceId) {
    this.props.history.push(`/finc-select/metadata-collections?filters=mdSource.${sourceId}`);
  }

  render() {
    return (
      <div data-test-collection-instances>

        {/* <Row>
          <Col xs={6}>
            <Button
              id="showAllCollections"
              buttonStyle="primary"
              onClick={() => this.handleClick(this.props.sourceId)}
            >
              showAllCollections with sourceId: {this.props.sourceId}
            </Button>
          </Col>
        </Row> */}

        <Link to={{
          pathname: '/finc-select/metadata-collections',
          search: `?filters=mdSource.${this.props.sourceId}`
          // search: `?mdSource.id=${sourceId} AND selected==true`
        }}
        >
          <span>link to cols for SourceId: {this.props.sourceId}</span>
        </Link>

      </div>
    );
  }
}
export default injectIntl(ShowAllCollections);
