import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  Row
} from '@folio/stripes/components';

class SelectAllCollections extends React.Component {
  static manifest = Object.freeze({
    selectAll: {
      type: 'okapi',
      fetch: false,
      accumulate: 'true',
      PUT: {
        path: 'finc-select/metadata-sources/!{sourceId}/collections/select-all'
      }
    }
  });

  static propTypes = {
    stripes: PropTypes.object,
    sourceId: PropTypes.string.isRequired,
    mutator: PropTypes.shape({
      selectAll: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.okapiUrl = props.stripes.okapi.url;
    this.httpHeaders = Object.assign({}, {
      'X-Okapi-Tenant': props.stripes.okapi.tenant,
      'X-Okapi-Token': props.stripes.store.getState().okapi.token,
      'Content-Type': 'application/json'
    });
  }

  selectAllCollections = (sourceId) => {
    const selectTrue = { select: true };
    const selectJson = JSON.stringify(selectTrue);

    fetch(`${this.okapiUrl}/finc-select/metadata-sources/${sourceId}/collections/select-all`,
      {
        headers: this.httpHeaders,
        method: 'PUT',
        body: selectJson
      })
      .then((response) => {
        if (response.status >= 400) {
          // show error
          return (
            <div>error</div>
          );
        } else {
        // show success
          return (
            <div>success</div>
          );
        }
      });
  }

  render() {
    const { sourceId } = this.props;

    return (
      <div>
        <Row>
          <Col xs={6}>
            <Button
              id="selectAllCollections"
              buttonStyle="primary"
              onClick={() => this.selectAllCollections(sourceId)}
            >
              <FormattedMessage id="ui-finc-select.source.button.selectAllCollections" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default SelectAllCollections;
