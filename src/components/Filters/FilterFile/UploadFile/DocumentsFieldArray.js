import React from 'react';
import PropTypes from 'prop-types';
// import { get } from 'lodash';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  Icon,
  Layout,
  Row,
  TextField,
} from '@folio/stripes/components';

import EditCard from './EditCard';
import FileUploaderField from './FileUploaderField';
import withKiwtFieldArray from './withKiwtFieldArray';

class DocumentsFieldArray extends React.Component {
  static propTypes = {
    addDocBtnLabel: PropTypes.node,
    onDownloadFile: PropTypes.func,
    onUploadFile: PropTypes.func,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onMarkforDeletion: PropTypes.func,
    onReplaceField: PropTypes.func,
    fields: PropTypes.shape({
      getAll: PropTypes.func.isRequired,
      insert: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired
  }

  static defaultProps = {
    addDocBtnLabel: <FormattedMessage id="ui-finc-select.filter.file.addFile" />,
    isEmptyMessage: <FormattedMessage id="ui-finc-select.filter.file.empty" />,
  }

  // validateDocIsSpecified = (value, allValues, props, fieldName) => {
  //   const index = parseInt(/\[([0-9]*)\]/.exec(fieldName)[1], 10);
  //   const { fileUpload, label, name } = get(allValues, [this.props.name, index], {});
  //   if (name && (!fileUpload && !label)) {
  //     return <FormattedMessage id="doc.error.docsMustHaveLocationOrURL" />;
  //   }

  //   return undefined;
  // }

  validateRequired = (value) => (
    !value ? <FormattedMessage id="missingRequiredField" /> : undefined
  )

  renderFileUpload = (doc, onUploadFile, onDownloadFile, name, i) => {
    const { onDeleteField, onMarkforDeletion, onReplaceField } = this.props;

    if (_.isEmpty(doc)) {
      return (
        <React.Fragment>
          {onUploadFile &&
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12}>
                  <Field
                    component={FileUploaderField}
                    data-test-document-field-fileid
                    id={`${name}-fileId-${i}`}
                    label={<FormattedMessage id="doc.fileId" />}
                    name={`${name}[${i}].fileId`}
                    onDownloadFile={onDownloadFile}
                    onUploadFile={onUploadFile}
                    fileLabel={doc.label}
                    required
                    validate={this.validateRequired}
                    // validate={this.validateDocIsSpecified}
                  />
                </Col>
              </Row>
            </Col>
          }
        </React.Fragment>
      );
    } else {
      const fileConnectedText = `The filter file ${doc.label} is connected.`;
      return (
        <React.Fragment>
          {fileConnectedText}
          <Button
            buttonStyle="link slim"
            style={{ margin: 0, padding: 0 }}
            // onClick={() => onMarkforDeletion(doc)}
            onClick={e => {
              e.stopPropagation();
              // onDeleteField(i, doc);
              onMarkforDeletion(doc); // need this and additionaly need to remove the file-FK in the filters table
              // onReplaceField(i, doc);
            }}
          >
            <Icon icon="trash" />
          </Button>
        </React.Fragment>
      );
    }
  }

  renderDocs = () => {
    const {
      onDownloadFile,
      onUploadFile,
      items,
      name,
      onDeleteField
    } = this.props;

    return items.map((doc, i) => (
      <EditCard
        data-test-document-field
        deleteBtnProps={{
          'id': `${name}-delete-${i}`,
          'data-test-delete-field-button': true
        }}
        header={<FormattedMessage id="ui-finc-select.filter.file.label" values={{ number: i + 1 }} />}
        key={i}
        onDelete={() => onDeleteField(i, doc)}
      >
        <Row>
          <Col xs={12} md={onUploadFile ? 6 : 12}>
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-label
                  component={TextField}
                  id={`${name}-label-${i}`}
                  label={<FormattedMessage id="ui-finc-select.filter.file.label" />}
                  name={`${name}[${i}].label`}
                  required
                  validate={this.validateRequired}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-criteria
                  component={TextField}
                  id={`${name}-criteria-${i}`}
                  label={<FormattedMessage id="ui-finc-select.filter.file.criteria" />}
                  name={`${name}[${i}].criteria`}
                />
              </Col>
            </Row>
          </Col>
          {this.renderFileUpload(doc, onUploadFile, onDownloadFile, name, i)}
          {/* {onUploadFile &&
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12}>
                  <Field
                    component={FileUploaderField}
                    data-test-document-field-fileid
                    id={`${name}-fileId-${i}`}
                    label={<FormattedMessage id="doc.fileId" />}
                    name={`${name}[${i}].fileId`}
                    onDownloadFile={onDownloadFile}
                    onUploadFile={onUploadFile}
                    fileLabel={doc.label}
                    required
                    validate={this.validateRequired}
                    // validate={this.validateDocIsSpecified}
                  />
                </Col>
              </Row>
            </Col>
          } */}
        </Row>
      </EditCard>
    ));
  }

  renderEmpty = () => (
    <Layout data-test-document-field-empty-message className="padding-bottom-gutter">
      { this.props.isEmptyMessage }
    </Layout>
  )

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-documents-field-array>
        <div>
          { items.length ? this.renderDocs() : this.renderEmpty() }
        </div>
        <Button
          data-test-documents-field-array-add-button
          id={`add-${name}-btn`}
          onClick={() => onAddField({})}
        >
          { this.props.addDocBtnLabel }
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(DocumentsFieldArray);
