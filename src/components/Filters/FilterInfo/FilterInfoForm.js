import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';

import { Required } from '../../DisplayUtils/Validate';

class FilterInfoForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const dataType = [
      { value: 'Whitelist', label: 'Whitelist' },
      { value: 'Blacklist', label: 'Blacklist' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.filter.generalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.filter.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a name to identify the filter"
              name="label"
              id="addfilter_label"
              component={TextField}
              validate={[Required]}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.filter.type">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a type for the filter"
              name="type"
              id="addfilter_type"
              component={Select}
              validate={[Required]}
              fullWidth
              dataOptions={dataType}
            />
          </Col>
        </Row>
        {/* is not necesary */}
        {/* <Row>
          <Col xs={4}>
            <Field
              label={<FormattedMessage id="ui-finc-select.filter.isil" />}
              placeholder="Enter a ISIL for the filter"
              name="isil"
              id="addfilter_isil"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row> */}
      </Accordion>
    );
  }
}

FilterInfoForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default FilterInfoForm;
