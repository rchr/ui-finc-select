import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  Pane,
  Row
} from '@folio/stripes/components';
import {
  TitleManager
} from '@folio/stripes/core';

import SourceInfoView from './SourceInfo/SourceInfoView';
import SourceManagementView from './SourceManagement/SourceManagementView';
import SourceTechnicalView from './SourceTechnical/SourceTechnicalView';

class MetadataSourceView extends React.Component {
  static manifest = Object.freeze({
    query: {},
  });

  static propTypes = {
    stripes: PropTypes
      .shape({
        hasPerm: PropTypes.func,
        connect: PropTypes.func.isRequired,
        logger: PropTypes
          .shape({ log: PropTypes.func.isRequired })
          .isRequired
      })
      .isRequired,
    paneWidth: PropTypes.string,
    resources: PropTypes.shape({
      metadataSource: PropTypes.shape(),
      query: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    parentResources: PropTypes.shape(),
    onClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    const logger = props.stripes.logger;
    this.log = logger.log.bind(logger);

    this.state = {
      accordions: {
        managementAccordion: false,
        technicalAccordion: false
      },
    };
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const source = (parentResources.records || {}).records || [];
    if (!source || source.length === 0 || !id) return null;
    return source.find(u => u.id === id);
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

  render() {
    const initialValues = this.getData();

    if (_.isEmpty(initialValues)) {
      return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    } else {
      const label = _.get(initialValues, 'label', '-');

      return (
        <Pane
          defaultWidth={this.props.paneWidth}
          id="pane-sourcedetails"
          paneTitle={<span data-test-source-header-title>{label}</span>}
          dismissible
          onClose={this.props.onClose}
        >
          <TitleManager record={label} />
          <SourceInfoView
            id="sourceInfo"
            metadataSource={initialValues}
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
            label={<FormattedMessage id="ui-finc-select.source.managementAccordion" />}
            id="managementAccordion"
          >
            <SourceManagementView
              id="sourceManagement"
              metadataSource={initialValues}
              stripes={this.props.stripes}
            />
          </Accordion>
          <Accordion
            open={this.state.accordions.technicalAccordion}
            onToggle={this.handleAccordionToggle}
            label={<FormattedMessage id="ui-finc-select.source.technicalAccordion" />}
            id="technicalAccordion"
          >
            <SourceTechnicalView
              id="sourceTechnical"
              metadataSource={initialValues}
              stripes={this.props.stripes}
            />
          </Accordion>
        </Pane>
      );
    }
  }
}

export default MetadataSourceView;
