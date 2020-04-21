import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues, change } from 'redux-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
// import { Field } from 'react-final-form';

import {
  Accordion,
  // List,
} from '@folio/stripes/components';
import {
  stripesShape,
} from '@folio/stripes-core';

import FindCollections from './FindCollections/FindCollections';

class CollectionsForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    collectionIds: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
    filterId: PropTypes.string,
    selectRecords: PropTypes.func,
  };

  static defaultProps = {
    selectRecords: _.noop,
  }

  // renderList = ({ fields }) => {
  //   const showPerms = _.get(this.props.stripes, ['config', 'showPerms']);
  //   const listFormatter = (fieldName, index) => (this.renderItem(fields.get(index), index, showPerms));

  //   return (
  //     <List
  //       items={fields}
  //       itemFormatter={listFormatter}
  //       isEmptyMessage={<FormattedMessage id="ui-finc-select.filter.collections.empty" />}
  //     />
  //   );
  // };

  getSelectedCollections = records => {
    this.props.selectRecords(records);

    // console.log('finc select collectionsform');
    // console.log(records);
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-select.filter.collectionAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <div>
          {/* Plugin has to be inside of Field, otherwise pristine is not working */}
          <FieldArray
            component={FindCollections}
            name="collectionIds"
            filterId={this.props.filterId}
            isEditable
            collectionIds={this.props.collectionIds}
            stripes={this.props.stripes}
            selectRecords={this.getSelectedCollections}
            {...this.props}
          />
        </div>
      </Accordion>
    );
  }
}

const mapStateToProps = (state) => ({
  // collectionIds: getFormValues('collectionIds')(state),
  addCollections: getFormValues('folio_finc_select_collections_ids')(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCollections: (collectionIds) => dispatch(change('FilterForm', 'collectionIds', collectionIds)),
});

const connectedCollectionsForm = connect(mapStateToProps, mapDispatchToProps)(CollectionsForm);

CollectionsForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default connectedCollectionsForm;
