import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    history: PropTypes.shape({
      push: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.connectedSelectAllCollections = this.props.stripes.connect(SelectAllCollections);
  }

  // just necessary, if button will be used instead of link
  showAllCollections(sourceId) {
    this.props.history.push(`/finc-select/metadata-collections?filters=mdSource.${sourceId}`);
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
          </Row>
          <Row>
            <this.connectedSelectAllCollections
              stripes={stripes}
              sourceId={sourceId}
            />
          </Row>
          <Row>
            <Col xs={6}>
              <Button
                id="showSelectedCollections"
                buttonStyle="primary"
              >
                <FormattedMessage id="ui-finc-select.source.button.showselectedCollections" />
              </Button>
            </Col>
          </Row>

          <Row>
            {/* showAllCollections as link */}
            {/* <Link to={{
              pathname: '/finc-select/metadata-collections',
              search: `?filters=mdSource.${sourceId}`
            }}
            >
              <span>
                <FormattedMessage id="ui-finc-select.source.button.showAllCollections" />
                {sourceId}
              </span>
            </Link> */}

            {/* showAllCollections as button */}
            <Button
              id="showAllCollections"
              buttonStyle="primary"
              onClick={() => this.showAllCollections(sourceId)}
            >
              <FormattedMessage id="ui-finc-select.source.button.showAllCollections" />
              {sourceId}
            </Button>
          </Row>

          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.organization" />}
              value={_.get(metadataSource, 'organization.name', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-select.source.generalNotes" />}
              value={_.get(metadataSource, 'generalNotes', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SourceManagementView);
