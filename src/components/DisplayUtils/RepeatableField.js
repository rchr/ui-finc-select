import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

class RepeatableField extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.renderSubContract = this.renderSubContract.bind(this);
  }

  renderSubContract = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={8}>
          <Field
            name={elem}
            id={elem}
            component={TextField}
            fullWidth
          />
        </Col>
        <Col
          xs={2}
          style={{ textAlign: 'right' }}
        >
          <Button
            onClick={() => fields.remove(index)}
            buttonStyle="danger"
          >
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
          {fields.map(this.renderSubContract)}
        </Col>
        <Col
          xs={12}
          style={{ paddingTop: '10px' }}
        >
          <Button onClick={() => fields.push('')}>+ Add</Button>
        </Col>
      </Row>
    );
  }
}

export default RepeatableField;
