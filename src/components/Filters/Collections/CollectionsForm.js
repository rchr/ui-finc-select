import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';

import {
  Accordion,
  List,
} from '@folio/stripes/components';
import {
  stripesShape,
} from '@folio/stripes-core';

import FindCollection from './FindCollection/FindCollection';

class CollectionsForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    availableCollections: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
  };

  renderList = ({ fields }) => {
    const showPerms = _.get(this.props.stripes, ['config', 'showPerms']);
    const listFormatter = (fieldName, index) => (this.renderItem(fields.get(index), index, showPerms));

    return (
      <List
        items={fields}
        itemFormatter={listFormatter}
        isEmptyMessage={<FormattedMessage id="ui-users.permissions.empty" />}
      />
    );
  };

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
          <Field
            component={FindCollection}
            name="mdSource"
            // intialSource={this.state.source}
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
