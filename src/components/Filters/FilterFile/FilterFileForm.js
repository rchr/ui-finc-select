import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion
} from '@folio/stripes/components';
import DocumentsFieldArray from './UploadFile/DocumentsFieldArray';

class FilterFileForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        hallo
      </Accordion>
    );
  }
}

FilterFileForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};
export default FilterFileForm;
