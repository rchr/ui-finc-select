import _ from 'lodash';
import React from 'react';
import {
  intlShape,
  injectIntl,
  FormattedMessage
} from 'react-intl';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {
  Button
} from '@folio/stripes/components';

class FileUploader extends React.Component {
  static propTypes = {
    onSelectFile: PropTypes.func.isRequired,
    onClickUpload: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
    intl: intlShape.isRequired,
  }

  onDrop = (acceptedFiles) => {
    this.props.onSelectFile(acceptedFiles);
  }

  renderDownloadButton = () => {
    if (_.isEmpty(this.props.selectedFile)) {
      return null;
    } else {
      const upload = 'upload';
      return (
        <Button
          buttonStyle="primary"
          onClick={() => this.props.onClickUpload()}
        >
          { `${upload} ${this.props.selectedFile.name}` }
        </Button>
      );
    }
  }

  render() {
    const baseStyle = {
      'display': 'flex',
      'alignItems': 'center',
      'flexDirection': 'column',
      'justifyContent': 'center',
      'height': '100%',
      'borderWidth': '2',
      'borderColor': '#666',
      'borderStyle': 'dashed',
      'borderRadius': '5'
    };

    const style = { ...baseStyle };
    return (
      <Dropzone
        onDrop={this.onDrop}
        multiple
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps({ onClick: evt => evt.preventDefault() })}>
            <div style={style}>
              <input {...getInputProps()} />
              upload.dropFile
              <Button
                buttonStyle="primary"
                onClick={() => open()}
              >
                upload.selectFile
              </Button>
              { this.renderDownloadButton() }
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default injectIntl(FileUploader);
