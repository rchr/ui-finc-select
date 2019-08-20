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
  IconButton,
  Layer,
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
import FilterForm from './FilterForm';

class FilterView extends React.Component {
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
      filter: PropTypes.shape(),
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
    parentMutator: PropTypes.shape().isRequired,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    editLink: PropTypes.string,
    onCloseEdit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const logger = props.stripes.logger;
    this.log = logger.log.bind(logger);
    this.connectedFilterForm = this.props.stripes.connect(FilterForm);

    this.state = {
      accordions: {
        fileAccordion: false
      },
    };
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const filter = (parentResources.records || {}).records || [];
    if (!filter || filter.length === 0 || !id) return null;
    return filter.find(u => u.id === id);
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

  update = (filter) => {
    this.props.parentMutator.records.PUT(filter).then(() => {
      this.props.onCloseEdit();
    });
  }

  getFilterFormData = (filter) => {
    const filterFormData = filter ? _.cloneDeep(filter) : filter;
    return filterFormData;
  }

  render() {
    const { resources, stripes } = this.props;
    const query = resources.query;
    const initialValues = this.getData();
    // const files = _.get(resources, 'files', []);
    const files = [];

    if (_.isEmpty(initialValues)) {
      return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    } else {
      const filterFormData = this.getFilterFormData(initialValues);
      const detailMenu = (
        <PaneMenu>
          <IfPermission perm="filter.item.put">
            <IconButton
              icon="edit"
              id="clickable-edit-filter"
              style={{
                visibility: !initialValues
                  ? 'hidden'
                  : 'visible'
              }}
              onClick={this.props.onEdit}
              href={this.props.editLink}
              title="Edit Filter"
            />
          </IfPermission>
        </PaneMenu>
      );

      const label = _.get(initialValues, 'label', '-');
      // const filterFiles = this.props.parentResources.filterFiles;

      return (
        <Pane
          defaultWidth={this.props.paneWidth}
          id="pane-filterdetails"
          paneTitle={<span data-test-filter-header-title>{label}</span>}
          lastMenu={detailMenu}
          dismissible
          onClose={this.props.onClose}
        >
          <TitleManager record={label} />
          <div id="filterDetails">
            <FilterInfoView
              id="filterInfo"
              filter={initialValues}
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
              open={this.state.accordions.fileAccordion}
              onToggle={this.handleAccordionToggle}
              label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
              id="fileAccordion"
            >
              <FilterFileView
                id="filterInfo"
                filter={initialValues}
                stripes={this.props.stripes}
                docs={initialValues.filterFiles}
              />
            </Accordion>
            {/* <FilterSupplementaryView
              id="filterSupplementary"
              filter={initialValues}
              stripes={this.props.stripes}
              filterShape={initialValues}
              // filterFiles={filterFiles.records}
              {...this.props}
            /> */}
          </div>
          <Layer
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
          </Layer>
        </Pane>
      );
    }
  }
}

export default FilterView;
