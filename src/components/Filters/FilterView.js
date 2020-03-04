import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Layout,
  Pane,
  PaneMenu,
  Row
} from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager
} from '@folio/stripes/core';

import FilterInfoView from './FilterInfo/FilterInfoView';
import FilterFileView from './FilterFile/FilterFileView';

class FilterView extends React.Component {
  static propTypes = {
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onEdit: PropTypes.func,
    }).isRequired,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
      okapi: PropTypes.object.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        fileAccordion: false
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
      <IfPermission perm="finc-select.filters.item.put">
        <PaneMenu>
          <IconButton
            icon="edit"
            id="clickable-edit-filter"
            onClick={handlers.onEdit}
            style={{
              visibility: !record
                ? 'hidden'
                : 'visible'
            }}
            title="Edit Filter"
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
        id="pane-filterdetails"
        onClose={this.props.handlers.onClose}
        paneTitle={<span data-test-filter-header-title>loading</span>}
      >
        <Layout className="marginTop1">
          <Icon icon="spinner-ellipsis" width="10px" />
        </Layout>
      </Pane>
    );
  }

  getFilterFormData = (filter) => {
    const filterFormData = filter ? _.cloneDeep(filter) : filter;

    return filterFormData;
  }

  render() {
    const { record, isLoading, stripes } = this.props;

    if (isLoading) return this.renderLoadingPane();

    const label = _.get(record, 'label', '-');
    const docs = _.get(record, 'filterFiles', '-');

    return (
      <React.Fragment>
        <Pane
          defaultWidth="40%"
          dismissible
          id="pane-filterdetails"
          lastMenu={this.renderEditPaneMenu()}
          onClose={this.props.handlers.onClose}
          paneTitle={<span data-test-filter-header-title>{label}</span>}
        >
          <TitleManager record={label} />
          <div id="filterDetails">
            <AccordionSet>
              <FilterInfoView
                id="filterInfo"
                filter={record}
                stripes={stripes}
              />
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    accordionStatus={this.state.accordions}
                    onToggle={this.handleExpandAll}
                    setStatus={null}
                  />
                </Col>
              </Row>
              <Accordion
                id="fileAccordion"
                label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
                onToggle={this.handleAccordionToggle}
                open={this.state.accordions.fileAccordion}
              >
                <FilterFileView
                  id="filterInfo"
                  filter={record}
                  stripes={stripes}
                  docs={docs}
                />
              </Accordion>
            </AccordionSet>
          </div>
        </Pane>
      </React.Fragment>
    );
  }
}


export default FilterView;
