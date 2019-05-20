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

// import MetadataCollectionForm from './MetadataCollectionForm';
import CollectionInfoView from '../CollectionInfo/CollectionInfoView';
// import CollectionManagementView from '../CollectionManagement/CollectionManagementView';
// import CollectionTechnicalView from '../CollectionTechnical/CollectionTechnicalView';

class MetadataCollectionView extends React.Component {
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
      metadataCollection: PropTypes.shape(),
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
    // this.connectedMetadataCollectionForm = this.props.stripes.connect(MetadataCollectionForm);

    this.state = {
      accordions: {
        managementAccordion: false,
        technicalAccordion: false
      },
    };
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const collection = (parentResources.records || {}).records || [];
    if (!collection || collection.length === 0 || !id) return null;
    return collection.find(u => u.id === id);
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

  update = (collection) => {
    this.props.parentMutator.records.PUT(collection).then(() => {
      this.props.onCloseEdit();
    });
  }

  getCollectionFormData = (collection) => {
    const collectionFormData = collection ? _.cloneDeep(collection) : collection;
    return collectionFormData;
  }

  deleteCollection = (collection) => {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: collection.id })
      .then(() => {
        parentMutator.query.update({
          _path: '/finc-select/metadata-collections',
          layer: null
        });
      });
  }

  render() {
    const { resources, stripes } = this.props;
    const query = resources.query;
    const initialValues = this.getData();

    if (_.isEmpty(initialValues)) {
      return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    } else {
      const collectionFormData = this.getCollectionFormData(initialValues);
      const detailMenu = (
        <PaneMenu>
          <IfPermission perm="metadatacollections.item.delete">
            <IconButton
              icon="trash"
              id="clickable-delete-collection"
              style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
              onClick={() => this.deleteCollection(initialValues)}
              title="Delete Metadata Collection"
            />
          </IfPermission>
          <IfPermission perm="metadatacollections.item.put">
            <IconButton
              icon="edit"
              id="clickable-edit-collection"
              style={{
                visibility: !initialValues
                  ? 'hidden'
                  : 'visible'
              }}
              onClick={this.props.onEdit}
              href={this.props.editLink}
              title="Edit Metadata Collection"
            />
          </IfPermission>
        </PaneMenu>
      );

      const label = _.get(initialValues, 'label', '-');

      return (
        <Pane
          defaultWidth={this.props.paneWidth}
          id="pane-collectiondetails"
          paneTitle={<span data-test-collection-header-title>{label}</span>}
          lastMenu={detailMenu}
          dismissible
          onClose={this.props.onClose}
        >
          <TitleManager record={label} />
          <CollectionInfoView
            id="collectionInfo"
            metadataCollection={initialValues}
            stripes={this.props.stripes}
            // add props here, for getting access to the name of the metadata-source-id
            {...this.props}
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
            label={<FormattedMessage id="ui-finc-select.collection.managementAccordion" />}
            id="managementAccordion"
          >
            {/* <CollectionManagementView
              id="collectionManagement"
              metadataCollection={initialValues}
              stripes={this.props.stripes}
            /> */}
          </Accordion>
          <Accordion
            open={this.state.accordions.technicalAccordion}
            onToggle={this.handleAccordionToggle}
            label={<FormattedMessage id="ui-finc-select.collection.technicalAccordion" />}
            id="technicalAccordion"
          >
            {/* <CollectionTechnicalView
              id="collectionTechnical"
              metadataCollection={initialValues}
              stripes={this.props.stripes}
            /> */}
          </Accordion>
          <Layer
            isOpen={query.layer ? query.layer === 'edit' : false}
            contentLabel="Edit Metadata Collection Dialog"
          >
            {/* <this.connectedMetadataCollectionForm
              stripes={stripes}
              initialValues={collectionFormData}
              onSubmit={(record) => { this.update(record); }}
              onCancel={this.props.onCloseEdit}
              parentResources={{
                ...this.props.resources,
                ...this.props.parentResources,
              }}
              parentMutator={this.props.parentMutator}
            /> */}
          </Layer>
        </Pane>
      );
    }
  }
}

export default MetadataCollectionView;
