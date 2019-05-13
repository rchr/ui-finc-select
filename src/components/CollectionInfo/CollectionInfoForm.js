import _ from 'lodash';
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
  TextField,
  Select
} from '@folio/stripes/components';
import {
  Required
} from '../DisplayUtils/Validate';

class CollectionInfoForm extends React.Component {
  static propTypes = {
    parentResources: PropTypes.arrayOf(PropTypes.object)
  };

  getData(resourceName) {
    const { parentResources } = this.props;
    const records = (parentResources[`${resourceName}`] || {}).records || [];
    if (!records || records.length === 0) return null;
    const newArr = [];

    // add an empty object
    // let preObj = {};
    // preObj = { label: '-- Select a Source --', value: '' };
    // newArr.push(preObj);

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
    const sourceData = this.getData('source');

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.collection.generalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-select.collectionInfo.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a name to identify the metadata collection"
              name="label"
              id="addcollection_label"
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
                <FormattedMessage id="ui-finc-select.collectionInfo.description">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a description for the metadata collection"
              name="description"
              id="addcollection_description"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            <Field
              label="Source*"
              placeholder="Select a source for the metadata collection"
              name="mdSource.id"
              id="addcollection_source"
              component={Select}
              fullWidth
              validate={[Required]}
              dataOptions={sourceData}
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
