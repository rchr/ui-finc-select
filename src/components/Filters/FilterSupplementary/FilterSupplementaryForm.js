import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { DocumentsFieldArray } from '@folio/stripes-erm-components';
// import DocumentsFieldArray from '../DocumentsFieldArray/DocumentsFieldArray';

class FilterSupplementaryForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleUploadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    const formData = new FormData();
    formData.append('upload', file);

    return fetch(`${okapi.url}/finc-select/files`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
      body: formData,
    });
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
    const { id } = this.props;

    return (
      <React.Fragment>
        Hallo FilterSupplementaryForm
        <FieldArray
          // addDocBtnLabel="Button label"
          component={DocumentsFieldArray}
          // isEmptyMessage="empty message"
          name="supplementaryDocs"
          onDownloadFile={this.handleDownloadFile}
          onUploadFile={this.handleUploadFile}
        />
      </React.Fragment>
    );
  }
}
export default FilterSupplementaryForm;
