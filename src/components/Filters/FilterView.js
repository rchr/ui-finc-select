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
  Layer,
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
    }),
  };

  constructor(props) {
    super(props);

    // this.connectedFilterForm = this.props.stripes.connect(FilterForm);

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
      <IfPermission perm="ui-finc-select.filters.item.put">
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
            <FilterInfoView
              id="filterInfo"
              filter={record}
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
              id="fileAccordion"
              label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
              onToggle={this.handleAccordionToggle}
              open={this.state.accordions.fileAccordion}
            >
              {/* <FilterFileView
                id="filterInfo"
                filter={record}
                stripes={this.props.stripes}
                docs={record.filterFiles}
              /> */}
            </Accordion>
          </div>
          {/* <Layer
            isOpen={query.layer ? query.layer === 'edit' : false}
            contentLabel="Edit Filter Dialog"
          >
            <this.connectedFilterForm
              stripes={stripes}
              initialValues={filterFormData}
              onSubmit={(record) => { this.update(record); }}
              onCancel={this.props.onCloseEdit}
              parentResources={{
                ...this.props.resources,
                ...this.props.parentResources,
              }}
              parentMutator={this.props.parentMutator}
            />
          </Layer> */}
        </Pane>
      </React.Fragment>
    );
  }
}


export default FilterView;
