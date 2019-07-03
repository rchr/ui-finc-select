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
import ShowAllCollections from './ShowAllCollections';

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
    this.connectedShowAllCollections = this.props.stripes.connect(ShowAllCollections);
    // this.showAllCollections = this.showAllCollections.bind(this);
  }

  // showAllCollections = (sourceId) => {
  //   this.props.history.push('/finc-select/metadata-collections');
  //   // window.location.hash = '/finc-select/metadata-collections';
  // }

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

          {/* <Row>
            <Col xs={6}>
              <Button
                id="showAllCollections"
                buttonStyle="primary"
                onClick={() => this.showAllCollections(sourceId)}
              >
                huhuh <FormattedMessage id="ui-finc-select.source.button.showAllCollections" />
              </Button>
            </Col>
          </Row> */}
       
          <Row>
            <this.connectedShowAllCollections
              stripes={stripes}
              sourceId={sourceId}
              {...this.props}
            />
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
        {/* <Switch>
          <Route
            path={`${match.path}/metadata-collections`}
            render={props => <this.connectedShowAllCollections
              stripes={stripes}
              // mutator={mutator}
              // resources={resources}
              {...props}
            />
            }
          />
        </Switch> */}

      </React.Fragment>
    );
  }
}

export default SourceManagementView;
