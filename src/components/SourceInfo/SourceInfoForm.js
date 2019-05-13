import React from 'react';
import PropTypes from 'prop-types';
import {
  Field
} from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';
// import {
//   Required
// } from '../DisplayUtils/Validate';

class SourceInfoForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    const dataOptionsStatus = [
      { value: 'active', label: 'Active' },
      { value: 'wish', label: 'Wish' },
      { value: 'technical implementation', label: 'Technical Implementation' },
      { value: 'negotiation', label: 'Negotiation' },
      { value: 'deactivated', label: 'Deactivated' },
      { value: 'terminated', label: 'Terminated' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.source.generalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.sourceInfo.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a name to identify the metadata source"
              name="label"
              id="addsource_label"
              component={TextField}
              // validate={[Required]}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.sourceInfo.description">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a description for the metadata source"
              name="description"
              id="addsource_description"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.sourceInfo.status">
                  {(msg) => msg + ' *'}
                </FormattedMessage>
              }
              name="status"
              id="addsource_status"
              placeholder="Select a status for the metadata source"
              component={Select}
              dataOptions={dataOptionsStatus}
              // validate={[Required]}
              fullWidth
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceInfoForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default SourceInfoForm;
