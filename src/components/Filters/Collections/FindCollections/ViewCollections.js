import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Label,
  Row,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import BasicCss from '../../../BasicStyle.css';

class ViewCollections extends React.Component {
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
        searchLabel="Metadata collection"
        selectCollection={this.selectCollection}
        type="find-finc-metadata-collection"
        visibleColumns={['label']}
        filterId={this.props.filterId}
        collectionIds={this.props.collectionIds}
        isEditable={this.props.isEditable}
        {...this.props}
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        <Row>
          <Label className={BasicCss.styleForFormLabel}>
            <FormattedMessage id="ui-finc-select.filter.collections.viewCollection">
              {(msg) => msg}
            </FormattedMessage>
          </Label>
        </Row>
        <Row>
          <Col xs={4}>
            { pluggable }
          </Col>
          <Col xs={4}>
            {/* Field has to be removed for Show Collections */}
            {/* <Field
              ariaLabel="Add metadata collection"
              component={TextField}
              fullWidth
              id="addfilter_collection"
              name="collectionIds"
              placeholder="Please add a metadata collection"
              readOnly
            /> */}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ViewCollections.propTypes = {
  filterId: PropTypes.string,
  collectionIds: PropTypes.arrayOf(PropTypes.object),
  isEditable: PropTypes.bool,
  intialCollectionId: PropTypes.string,
  intialCollection: PropTypes.object,
  stripes: PropTypes.object,
  form: PropTypes.shape({
    mutators: PropTypes.shape({
      setCollection: PropTypes.func,
    }),
  }),
};

export default ViewCollections;
