import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import DocumentCard from './DownloadFile/DocumentCard';

class FilterFileView extends React.Component {
  static propTypes = {
    filter: PropTypes.shape({
      docs: PropTypes.arrayOf(
        PropTypes.shape({
          lable: PropTypes.string.isRequired,
          criteria: PropTypes.string,
        }),
      ),
    }),
  };

  renderDocs = (docs) => {
    return docs.map(doc => (
      <DocumentCard
        key={doc.id}
        onDownloadFile={this.handleDownloadFile}
        {...doc}
      />
    ));
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
    return (
      <React.Fragment>
        {this.props.docs.length ?
          this.renderDocs(this.props.docs) :
          <FormattedMessage id="supplementaryInfo.agreementHasNone" />
        }

      </React.Fragment>);
  }
}

export default FilterFileView;
