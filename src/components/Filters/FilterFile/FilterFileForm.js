import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import { FieldArray } from 'redux-form';
import {
  Accordion
} from '@folio/stripes/components';
import DocumentsFieldArray from './UploadFile/DocumentsFieldArray';

class FilterFileForm extends React.Component {
  static propTypes = {
    // handleDownloadFile: PropTypes.func.isRequired,
    // handleUploadFile: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
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
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        FilterFileForm
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="supplementaryInfo.addSupplementaryInfo" />}
          component={DocumentsFieldArray}
          onDownloadFile={this.handleDownloadFile}
          onUploadFile={this.handleUploadFile}
          isEmptyMessage={<FormattedMessage id="supplementaryInfo.agreementHasNone" />}
          name="filterFiles"
        />
      </Accordion>
    );
  }
}

FilterFileForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};
export default FilterFileForm;
