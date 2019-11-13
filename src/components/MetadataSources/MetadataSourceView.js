import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Layout,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

import SourceInfoView from './SourceInfo/SourceInfoView';
import SourceManagementView from './SourceManagement/SourceManagementView';
import SourceTechnicalView from './SourceTechnical/SourceTechnicalView';

class MetadataSourceView extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onEdit: PropTypes.func,
    }).isRequired,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    stripes: PropTypes.object,
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

  renderEditPaneMenu = () => {
    const { record, handlers } = this.props;

    return (
      <IfPermission perm="finc-config.metadata-sources.item.put">
        <PaneMenu>
          <IconButton
            icon="edit"
            id="clickable-edit-source"
            onClick={handlers.onEdit}
            style={{
              visibility: !record
                ? 'hidden'
                : 'visible'
            }}
            title="Edit Metadata Source"
          />
        </PaneMenu>
      </IfPermission>
    );
  }

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="40%"
        dismissible
        id="pane-sourcedetails"
        onClose={this.props.handlers.onClose}
        paneTitle={<span data-test-source-header-title>loading</span>}
      >
        <Layout className="marginTop1">
          <Icon icon="spinner-ellipsis" width="10px" />
        </Layout>
      </Pane>
    );
  }

  render() {
    const { record, isLoading } = this.props;
    const label = _.get(record, 'label', '-');

    if (isLoading) return this.renderLoadingPane();

    return (
      <React.Fragment>
        <Pane
          defaultWidth="40%"
          id="pane-sourcedetails"
          lastMenu={this.renderEditPaneMenu()}
          onClose={this.props.handlers.onClose}
          paneTitle={<span data-test-source-header-title>{label}</span>}
        >
          <SourceInfoView
            id="sourceInfo"
            metadataSource={record}
            stripes={this.props.stripes}
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
            open={this.state.accordions.managementAccordion}
            onToggle={this.handleAccordionToggle}
            label={<FormattedMessage id="ui-finc-select.source.accordion.management" />}
            id="managementAccordion"
          >
            <SourceManagementView
              id="sourceManagement"
              metadataSource={record}
              stripes={this.props.stripes}
            />
          </Accordion>
          <Accordion
            open={this.state.accordions.technicalAccordion}
            onToggle={this.handleAccordionToggle}
            label={<FormattedMessage id="ui-finc-select.source.accordion.technical" />}
            id="technicalAccordion"
          >
            <SourceTechnicalView
              id="sourceTechnical"
              metadataSource={record}
              stripes={this.props.stripes}
            />
          </Accordion>
        </Pane>
      </React.Fragment>
    );
  }
}

export default MetadataSourceView;
