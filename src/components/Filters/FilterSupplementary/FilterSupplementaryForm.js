import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
// import { DocumentsFieldArray } from '@folio/stripes-erm-components';
import DocumentsFieldArray from '../../DocumentsFieldArray/DocumentsFieldArray';

class FilterSupplementaryForm extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    handlers: PropTypes.shape({
      // onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }),
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      fileId: ''
    };
  }

  onUploadFile = (file) => {
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
    })
    // get id of the uploaded file, on which the file is saved in the database
      .then(response => {
        return response.text();
      }).then(data => {
        this.setState({ fileId: data });
        // const fileId = data;
        // console.log(fileId);
      });
  }

  // onDownloadFile = (file) => {
  //   const { stripes: { okapi } } = this.props;

  //   return fetch(`${okapi.url}/finc-select/files/${file.id}`, {
  //     headers: {
  //       'X-Okapi-Tenant': okapi.tenant,
  //       'X-Okapi-Token': okapi.token,
  //       // 'Content-Type': 'application/octet-stream'
  //     },
  //   }).then(response => response.blob())
  //     .then(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = file.name;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     });
  // }

  render() {
    const { handlers, filter } = this.props;
    const filterId = filter.id;

    return (
      <React.Fragment>
        Filter ID: { filterId }
        File ID: {this.state.fileId}
        <FieldArray
          // addDocBtnLabel="Button label"
          component={DocumentsFieldArray}
          // isEmptyMessage="empty message"
          name="supplementaryDocs"
          onDownloadFile={this.onDownloadFile}
          onUploadFile={this.onUploadFile}
        />
      </React.Fragment>
    );
  }
}
export default FilterSupplementaryForm;
