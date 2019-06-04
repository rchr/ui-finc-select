import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray
} from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Headline,
  Row,
  Select
} from '@folio/stripes/components';
import {
  Required
} from '../../DisplayUtils/Validate';

import RepeatableField from '../../DisplayUtils/RepeatableField';
import BasicCss from '../../BasicStyle.css';

class CollectionInfoForm extends React.Component {
  static propTypes = {
    parentResources: PropTypes.arrayOf(PropTypes.object)
  };

  getData(resourceName) {
    const { parentResources } = this.props;
    const records = (parentResources[`${resourceName}`] || {}).records || [];
    if (!records || records.length === 0) return null;
    const newArr = [];

    // Loop through records
    Object.keys(records).map((key) => {
      const obj = {
        label: _.toString(records[key].label),
        value: _.toString(records[key].id)
      };
      newArr.push(obj);
      if (Number(key) === (records.length - 1)) {
        return newArr;
      }
      return newArr;
    });
    return newArr;
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const dataOptionsSelected = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.collection.accordion.general" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        {/* FILTERS is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-select.collection.filters" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="filters"
              label="Displayfilters"
              id="display_filters"
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.collection.selected">
                  {(msg) => msg + ' *'}
                </FormattedMessage>
              }
              name="selected"
              id="addsource_selected"
              placeholder="Select if collection is selected"
              component={Select}
              dataOptions={dataOptionsSelected}
              validate={[Required]}
              fullWidth
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

CollectionInfoForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default CollectionInfoForm;
