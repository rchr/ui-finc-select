import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes-core';

import FindCollections from './FindCollections/FindCollections';

class CollectionsForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    collectionIds: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
    filterId: PropTypes.string,
    form: PropTypes.shape({
      mutators: PropTypes.shape({
        setCollection: PropTypes.func,
      })
    }),
  };

  setCollection = records => {
    this.props.form.mutators.setCollection({}, records);
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
            {...this.props}
          />
        </div>
      </Accordion>
    );
  }
}

CollectionsForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default CollectionsForm;
