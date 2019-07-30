import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Icon,
  IconButton,
  Layer,
  Pane,
  PaneMenu
} from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager
} from '@folio/stripes/core';
import FilterInfoView from './FilterInfo/FilterInfoView';
import FilterFileDownload from './FilterFile/FilterFileDownload';
import FilterSupplementaryView from './FilterSupplementary/FilterSupplementaryView';
import FilterForm from './FilterForm';

class FilterView extends React.Component {
  static manifest = Object.freeze({
    query: {},
    files: {
      type: 'okapi',
      records: 'fincSelectFiles',
      path: 'finc-select/files',
      resourceShouldRefresh: true
    },
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
      files: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
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
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const filter = (parentResources.records || {}).records || [];
    if (!filter || filter.length === 0 || !id) return null;
    return filter.find(u => u.id === id);
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

  deleteFilter = (filter) => {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: filter.id })
      .then(() => {
        parentMutator.query.update({
          _path: '/finc-select/filters',
          layer: null
        });
      });
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
          <IfPermission perm="filter.item.delete">
            <IconButton
              icon="trash"
              id="clickable-delete-filter"
              style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
              onClick={() => this.deleteFilter(initialValues)}
              title="Delete Filter"
            />
          </IfPermission>
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
      const filterFiles = this.props.parentResources.filterFiles;

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
              filterFiles={filterFiles.records}
            />
            <FilterFileDownload
              id="filterInfo"
              filter={initialValues}
              stripes={this.props.stripes}
              filterFiles={filterFiles.records}
              files={files}
            />
            <FilterSupplementaryView
              id="filterSupplementary"
              filter={initialValues}
              stripes={this.props.stripes}
              filterShape={initialValues}
            />
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
