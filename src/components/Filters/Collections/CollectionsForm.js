import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
} from '@folio/stripes/components';

class CollectionsForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-select.filter.collectionAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        here the collecions can be added
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
