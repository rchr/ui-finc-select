import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';

import { Accordion } from '@folio/stripes/components';

import DocumentsFieldArray from './UploadFile/DocumentsFieldArray';

class FilterFileForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    onToggle: PropTypes.func,
  };

  handleUploadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    return fetch(`${okapi.url}/finc-select/files`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/octet-stream'
      },
      body: file,
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
        id={accordionId}
        label={<FormattedMessage id="ui-finc-select.filter.fileAccordion" />}
        open={expanded}
        onToggle={onToggle}
      >
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="ui-finc-select.filter.file.addFile" />}
          component={DocumentsFieldArray}
          name="filterFiles"
          onDownloadFile={this.handleDownloadFile}
          onUploadFile={this.handleUploadFile}
        />
      </Accordion>
    );
  }
}

FilterFileForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};
export default FilterFileForm;
