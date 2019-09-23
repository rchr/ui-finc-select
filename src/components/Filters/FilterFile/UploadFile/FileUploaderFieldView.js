import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FileUploader from './FileUploader';

export default class FileUploaderFieldView extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    file: PropTypes.shape({
      modified: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      fileId: PropTypes.string,
    }).isRequired,
    isDropZoneActive: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onDownloadFile: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    uploadInProgress: PropTypes.bool,
    fileLabel: PropTypes.string
  }

  renderFileInfo = () => {
    const { file, fileLabel } = this.props;

    if (!file) return null;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-finc-select.filter.file.filename" />}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            {/* <a
              data-test-fuf-name
              href="#"
              onClick={(e) => {
                this.props.onDownloadFile(file);
                e.preventDefault();
                e.stopPropagation();
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              {fileLabel}
              <Icon icon="external-link" />
            </a> */}
            {fileLabel}
          </KeyValue>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      error,
      isDropZoneActive,
      onDelete, // eslint-disable-line no-unused-vars
      onDragEnter,
      onDragLeave,
      onDrop,
      uploadInProgress,
      ...rest
    } = this.props;

    return (
      <FormattedMessage id="ui-finc-select.filter.file.buttonAriaLabel">
        { buttonAriaLabel => (
          <FileUploader
            errorMessage={error}
            footer={this.renderFileInfo()}
            isDropZoneActive={isDropZoneActive}
            multiple={false}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            title={<FormattedMessage id="ui-finc-select.filter.file.dragDrop" />}
            uploadButtonAriaLabel={buttonAriaLabel}
            uploadButtonText={<FormattedMessage id="ui-finc-select.filter.file.choose" />}
            uploadInProgress={uploadInProgress}
            uploadInProgressText={<FormattedMessage id="ui-finc-select.filter.file.upload" />}
            {...rest}
          >
            {/* <FormattedMessage id="maxFileSize" /> */}
          </FileUploader>
        )}
      </FormattedMessage>
    );
  }
}
