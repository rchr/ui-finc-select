import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

class FindCollections extends React.Component {
  constructor(props) {
    super(props);

    const s = props.intialCollection || {};

    this.inputCollectionId = s.id;
    this.inputCollectionName = s.name;
  }

  selectCollection = (c) => {
    this.props.form.mutators.setCollection([
      c.id
    ]);

    this.setState(() => {
      return { collection: {
        id: c.id,
        name: c.label
      } };
    });
  }

  getSelectedCollections = (records) => {
    console.log('finc select findcollections');
    console.log(records);
  }

  render() {
    const disableRecordCreation = true;
    const buttonProps = { 'marginBottom0': true };
    // const addCollections = (collections) => {

    // };
    const pluggable =
      <Pluggable
        aria-haspopup="true"
        buttonProps={buttonProps}
        columnMapping={this.columnMapping}
        dataKey="collection"
        disableRecordCreation={disableRecordCreation}
        id="clickable-find-collection"
        marginTop0
        onCloseModal={(modalProps) => {
          modalProps.parentMutator.query.update({
            query: '',
            filters: '',
            sort: 'name',
          });
        }}
        searchButtonStyle="default"
        searchLabel="Add metadata collection"
        selectCollection={this.selectCollection}
        type="find-finc-metadata-collection"
        visibleColumns={['label']}
        filterId={this.props.filterId}
        collectionIds={this.props.collectionIds}
        isEditable={this.props.isEditable}
        // addCollections={addCollections}
        selectRecordsModal={this.getSelectedCollections}
        {...this.props}
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        {/* <Row>
          <Label className={BasicCss.styleForFormLabel}>
            <FormattedMessage id="ui-finc-select.filter.collections.addCollection">
              {(msg) => msg}
            </FormattedMessage>
          </Label>
        </Row> */}
        <Row>
          <Col xs={6}>
            { pluggable }
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

FindCollections.propTypes = {
  filterId: PropTypes.string,
  isEditable: PropTypes.bool,
  intialCollectionId: PropTypes.string,
  intialCollection: PropTypes.object,
  collectionIds: PropTypes.arrayOf(PropTypes.object),
  stripes: PropTypes.object,
  form: PropTypes.shape({
    mutators: PropTypes.shape({
      setCollection: PropTypes.func,
    }),
  }),
};

export default FindCollections;
