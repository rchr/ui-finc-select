import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
// import { DocumentsFieldArray } from '@folio/stripes-erm-components';
import DocumentsFieldArray from '../../DocumentsFieldArray/DocumentsFieldArray';

class FilterSupplementaryForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    fileId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileId: null
    };
  }

  handleUploadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    const formData = new FormData();
    formData.append('upload', file);

    return fetch(`${okapi.url}/finc-select/files`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/octet-stream'
      },
      body: formData,
    }).then(response => {
      return response.json();
    })
      .then(json => {
        console.log(JSON.stringify(json));
      });
    // .then(data => { console.log(data); });
  }

  doSomething = (file) => {
    const fileId = this.handleUploadFile(file);
  }

  handleDownloadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    return fetch(`${okapi.url}/finc-select/files/${file.id}`, {
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
    }).then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  render() {
    const { fileId } = this.props;

    return (
      <React.Fragment>
        Hallo FilterSupplementaryForm: {this.state.data}
        <FieldArray
          // addDocBtnLabel="Button label"
          component={DocumentsFieldArray}
          // isEmptyMessage="empty message"
          name="supplementaryDocs"
          onDownloadFile={this.handleDownloadFile}
          onUploadFile={this.handleUploadFile}
          // onUploadFile={this.doSomething}
        />
      </React.Fragment>
    );
  }
}
export default FilterSupplementaryForm;
