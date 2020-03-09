import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import {
  Accordion,
  Button,
  List,
} from '@folio/stripes/components';
import {
  stripesShape,
} from '@folio/stripes-core';

import CollectionsModal from './CollectionsModal';

class CollectionsForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    availableCollections: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.shape({
      mdSources: PropTypes.array,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      collectionModalOpen: false,
    };
  }

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

  openCollectionModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ collectionModalOpen: true });
  };

  closeCollectionModal = () => {
    this.setState({ collectionModalOpen: false });
  };

  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const { collectionModalOpen } = this.state;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-select.filter.collectionAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <FieldArray name="collections" component={this.renderList} />
        <Button
          type="button"
          align="end"
          bottomMargin0
          id="clickable-add-Collection"
          onClick={this.openCollectionModal}
        >
          <FormattedMessage id="ui-finc-select.filter.collections.addCollection" />
        </Button>
        {
          collectionModalOpen &&
          <CollectionsModal
            open={collectionModalOpen}
            onClose={this.closeCollectionModal}
            availableCollections={this.props.availableCollections}
            filterData={this.props.filterData}
          />
        }
      </Accordion>
    );
  }
}

CollectionsForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  // stripes: PropTypes.object,
};

export default CollectionsForm;
