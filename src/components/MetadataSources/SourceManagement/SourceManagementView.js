import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';
import SelectAllCollections from './SelectAllCollections';

class SourceManagementView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedSelectAllCollections = this.props.stripes.connect(SelectAllCollections);
  }

  render() {
    const { metadataSource, stripes } = this.props;
    const sourceId = metadataSource.id;

    return (
      <React.Fragment>
        <div id="id">
          {/* TODO: selectedCollections */}
          <Row>
            <Col xs={6}>
              <KeyValue
                label={<FormattedMessage id="ui-finc-select.source.selectedCollections" />}
                // value={_.get(metadataSource, 'selectedCollections', '-')}
              />
            </Col>
            <Col xs={6}>
              <Button
                id="showselectedCollections"
                buttonStyle="primary"
              >
                <FormattedMessage id="ui-finc-select.source.button.showselectedCollections" />
              </Button>
            </Col>
          </Row>

          <Row>
            <this.connectedSelectAllCollections
              stripes={stripes}
              sourceId={sourceId}
            />
          </Row>
          <Row>
            {/* <Col xs={6}>
              <Button
                id="selectAllCollections"
                buttonStyle="primary"
              >
                <FormattedMessage id="ui-finc-select.source.button.selectAllCollections" />
              </Button>
            </Col> */}

            <Col xs={6}>
              <Button
                id="showAllCollections"
                buttonStyle="primary"
              >
                <FormattedMessage id="ui-finc-select.source.button.showAllCollections" />
              </Button>
            </Col>
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
