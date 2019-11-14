import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  Layout,
  Pane,
  Row
} from '@folio/stripes/components';

import CollectionInfoView from './CollectionInfo/CollectionInfoView';
import CollectionContentView from './CollectionContent/CollectionContentView';
import CollectionTechnicalView from './CollectionTechnical/CollectionTechnicalView';


class CollectionViewRoute extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onEdit: PropTypes.func,
    }).isRequired,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    stripes: PropTypes.object,
    sources: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        managementAccordion: false,
        technicalAccordion: false
      },
    };
  }

  handleExpandAll = (obj) => {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);

      newState.accordions = obj;
      return newState;
    });
  }

  handleAccordionToggle = ({ id }) => {
    this.setState((state) => {
      const newState = _.cloneDeep(state);

      if (!_.has(newState.accordions, id)) newState.accordions[id] = true;
      newState.accordions[id] = !newState.accordions[id];
      return newState;
    });
  }

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="40%"
        dismissible
        id="pane-collectiondetails"
        onClose={this.props.handlers.onClose}
        paneTitle={<span data-test-collection-header-title>loading</span>}
      >
        <Layout className="marginTop1">
          <Icon icon="spinner-ellipsis" width="10px" />
        </Layout>
      </Pane>
    );
  }

  getData() {
    const { sources } = this.props;

    if (!sources || sources.length === 0) return null;
    return sources;
  }

  getSourceElement = (id, data) => {
    if (!data || data.length === 0 || !id) return null;
    return data.find((element) => {
      return element.id === id;
    });
  }

  render() {
    const { record, isLoading } = this.props;
    const label = _.get(record, 'label', '-');

    if (isLoading) return this.renderLoadingPane();

    // const sourceLink = this.getAllInfosForSource();
    // get all available sources
    const sourceData = this.getData('source');
    // get the source-ID, which is saved in the collection
    const sourceId = _.get(record, 'mdSource.id', '-');
    // get the one source and all its information (which has the source ID saved in the collection)
    const sourceElement = this.getSourceElement(sourceId, sourceData);

    return (
      <React.Fragment>
        <Pane
          defaultWidth="40%"
          dismissible
          id="pane-collectiondetails"
          onClose={this.props.handlers.onClose}
          paneTitle={<span data-test-collection-header-title>{label}</span>}
        >
          <CollectionInfoView
            id="collectionInfo"
            metadataCollection={record}
            stripes={this.props.stripes}
            sourceElement={sourceElement}
          />
          <Row end="xs">
            <Col xs>
              <ExpandAllButton
                accordionStatus={this.state.accordions}
                onToggle={this.handleExpandAll}
              />
            </Col>
          </Row>
          <Accordion
            id="managementAccordion"
            label={<FormattedMessage id="ui-finc-config.collection.managementAccordion" />}
            onToggle={this.handleAccordionToggle}
            open={this.state.accordions.managementAccordion}
          >
            <CollectionContentView
              id="collectionContent"
              metadataCollection={record}
              stripes={this.props.stripes}
            />
          </Accordion>
          <Accordion
            id="technicalAccordion"
            label={<FormattedMessage id="ui-finc-config.collection.technicalAccordion" />}
            onToggle={this.handleAccordionToggle}
            open={this.state.accordions.technicalAccordion}
          >
            <CollectionTechnicalView
              id="collectionTechnical"
              metadataCollection={record}
              stripes={this.props.stripes}
            />
          </Accordion>
        </Pane>
      </React.Fragment>
    );
  }
}

export default CollectionViewRoute;
