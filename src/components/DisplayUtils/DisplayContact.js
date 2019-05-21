import React from 'react';
import PropTypes from 'prop-types';
import {
  Field
} from 'redux-form';
import {
  Button,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

class DisplayContact extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
  };

  constructor(props) {
    super(props);
    this.renderSubContact = this.renderSubContact.bind(this);
  }

  renderSubContact = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={4}>
          <Field
            name={`${elem}.name`}
            id={elem}
            component={TextField}
            fullWidth
            placeholder="Enter a name for the contact"
          />
        </Col>
        <Col xs={4}>
          <Field
            name={`${elem}.role`}
            id={elem}
            component={TextField}
            fullWidth
            placeholder="Enter a role for the contact"
          />
        </Col>
        <Col xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map(this.renderSubContact)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push('')}>+ Add Contact</Button>
        </Col>
      </Row>
    );
  }
}

export default DisplayContact;
