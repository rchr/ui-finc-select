import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

class FindCollections extends React.Component {
  static defaultProps = {
    selectRecords: _.noop,
  }

  constructor(props) {
    super(props);

    const s = props.intialCollection || {};

    this.inputCollectionId = s.id;
    this.inputCollectionName = s.name;
  }

  getSelectedCollections = (records) => {
    this.props.selectRecords(records);
    // console.log('finc select findcollections');
    // console.log(records);
    this.props.addCollections(records);

    // this.props.form.mutators.setCollection([
    //   records
    // ]);

    // this.setState(() => {
    //   return { collectionIds: {
    //     records
    //   } };
    // });
  }

  render() {
    const disableRecordCreation = true;
    const buttonProps = { 'marginBottom0': true };

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
  getSelectedCollections: PropTypes.func,
  form: PropTypes.shape({
    mutators: PropTypes.shape({
      setCollection: PropTypes.func,
    }).isRequired,
  }),
  selectRecords: PropTypes.func,
  addCollections: PropTypes.func,
};

export default FindCollections;
