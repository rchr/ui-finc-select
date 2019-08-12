import React from 'react';
import PropTypes from 'prop-types';
import stripesForm from '@folio/stripes/form';
import {
  Field,
  FieldArray,
} from 'redux-form';
import {
  Button,
  Pane,
  Paneset,
  Row,
  TextField
} from '@folio/stripes/components';
import Dropzone from 'react-dropzone';
import FileUploaderField from '../../DocumentsFieldArray/FileUploaderField';
import DocumentsFieldArray from '../../DocumentsFieldArray/DocumentsFieldArray';


class FilterSupplementarySubform extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    stripes: PropTypes.object,
    fileId: PropTypes.string,
    filterId: PropTypes.string,
    parentMutator: PropTypes.shape({
      filterFiles: PropTypes.shape({
        POST: PropTypes.func,
        // DELETE: PropTypes.func,
        // GET: PropTypes.func,
      }).isRequired,
    }),
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileId: ''
    };

    this.successText = 'success';
    this.failText = 'fail';
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

  handleSubmit = (data) => {
    const { stripes: { okapi } } = this.props;

    const addData = {
      // set ID of the uploaded file
      file: this.state.fileId,
      // set ID of the current filter
      filter: this.props.filterId
      // file: '2116ac9c-d59c-4718-9e5c-dfa772408a0c',
      // filter: 'd7307f5c-04f2-4f6d-81ab-47f4d4b95b77'
      // id: '6016ac9c-d59c-4718-9e5c-dfa772408a0c'
    };

    const newData = Object.assign(data, addData);

    // console.log('Submission received!', newData);
    return fetch(`${okapi.url}/finc-select/filter-files`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData),
    }).then(val => {
      // console.log(val);
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form id="form-filter-files" onSubmit={handleSubmit(this.handleSubmit)}>
        <Paneset style={{ position: 'relative' }}>
          <Pane
            defaultWidth="fill"
            paneTitle="Pane Title"
          >
            <Button
              id="clickable-createnewfilterfile"
              // type="submit" is necessary for calling this.handleSubmit
              type="submit"
              title="saveButton"
              disabled={pristine || submitting}
              buttonStyle="primary paneHeaderNewButton"
              marginBottom0
            >
              Save Button
            </Button>
            {/* all fields for fincSelectFilterFile */}
            {/* id will be set by backend */}
            <Row>
              <Field
                label="label"
                placeholder="Enter label for filterfile"
                name="label"
                id="addfilterfile_label"
                component={TextField}
                fullWidth
              />
            </Row>
            <Row>
              <Field
                label="criteria"
                placeholder="Enter criteria for filterfile"
                name="criteria"
                id="addfilterfile_criteria"
                component={TextField}
                fullWidth
              />
            </Row>
            {/* filterID will be set by {filterId} */}
            {/* filterID will be set by return value of file-upload this.setState({ fileId: data }); */}
            {/* isil ? */}
            <Row>
              <Field
                label="filename"
                placeholder="Enter filename for filterfile"
                name="filename"
                id="addfilterfile_filename"
                component={TextField}
                fullWidth
              />
            </Row>
            {/* created will be set by backend */}

            <Field
              component={FileUploaderField}
              data-test-document-field-file
              id="id"
              label="filter file"
              name="name"
              onUploadFile={this.onUploadFile}
            />

            <FieldArray
              addDocBtnLabel="add file"
              component={DocumentsFieldArray}
              name="docs"
              onUploadFile={this.onUploadFile}
            />
            <Button
              onClick={this.handleClose}
            >
              close
            </Button>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'form-filterFile'
})(FilterSupplementarySubform);
