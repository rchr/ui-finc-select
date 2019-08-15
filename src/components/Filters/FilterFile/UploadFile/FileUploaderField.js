import React from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash';
import { withStripes, IntlConsumer } from '@folio/stripes/core';

import FileUploaderFieldView from './FileUploaderFieldView';

class FileUploaderField extends React.Component {
  static propTypes = {
    onDownloadFile: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.object,
  };

  state = {
    error: null,
    file: {},
    // file: { fileID: null },
    isDropZoneActive: false,
    uploadInProgress: false,
  }

  static getDerivedStateFromProps(props, state) {
    const { input: { value } } = props;

    if (value && value.id) {
      // We've been passed an initial value for the field that is an object
      // with an ID. This means we're currently showing a previously-saved file.
      // So if this is different from the file we've saved to our internal state,
      // save it off so we can properly render the metadata.
      if (state.file && (state.file.id !== value.id)) {
        return { file: value };
      }
    }

    return null;
  }

  processError(resp, intl) {
    const contentType = resp.headers ? resp.headers.get('Content-Type') : '';
    // if (contentType.startsWith('application/octet-stream')) {
    if (contentType.startsWith('application/json')) {
      throw new Error(`${resp.message} (${resp.error})`);
    } else {
      throw new Error(intl.formatMessage({ id: 'errors.uploadError' }));
    }
  }

  handleDrop = (acceptedFiles, intl) => {
    // the value of the fieldId will connected with the Field in DocuemtsFieldArray with onChange(file);
    // const {
    //   input: { value, onChange }
    // } = this.props;

    if (acceptedFiles.length !== 1) return;

    this.setState({
      error: undefined,
      isDropZoneActive: false,
      uploadInProgress: true,
    });

    this.props.onUploadFile(acceptedFiles[0])
      .then(response => {
        if (response.ok) {
          // example: file = "34bdd9da-b765-448a-8519-11d460a4df5d"
          response.text().then(file => {
            this.props.input.onChange(file);
            this.setState({ file });
            // console.log(this.state.file);
            // onChange(file);
          });
        } else {
          this.processError(response, intl);
        }
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.setState({
          error: error.message,
          file: {},
        });
      })
      .finally(() => this.setState({ uploadInProgress: false }));
  }

  handleDelete = () => {
    this.props.input.onChange(null);
    this.setState({ file: {} });
  }

  render() {
    return (
      /* TODO: Refactor this component to use `injectIntl` when Folio starts using react-intl 3.0 */
      <IntlConsumer>
        {intl => (
          <FileUploaderFieldView
            error={this.props.meta.error || this.state.error}
            file={this.props.input.value ? this.state.file : {}}
            isDropZoneActive={this.state.isDropZoneActive}
            onDelete={this.handleDelete}
            onDownloadFile={this.props.onDownloadFile}
            onDragEnter={() => this.setState({ isDropZoneActive: true })}
            onDragLeave={() => this.setState({ isDropZoneActive: false })}
            onDrop={(file) => this.handleDrop(file, intl)}
            uploadInProgress={this.state.uploadInProgress}
            {...pickBy(this.props, (_, key) => key.startsWith('data-test-'))}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default withStripes(FileUploaderField);
