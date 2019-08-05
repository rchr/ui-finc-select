import React from 'react';
import PropTypes from 'prop-types';
import {
  Row
} from '@folio/stripes/components';
// import { DocumentCard } from '@folio/stripes-erm-components';
import DocumentCard from '../../DocumentsFieldArray/DocumentCard';

class FilterSupplementaryView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    filter: PropTypes.object.isRequired,
    filterShape: PropTypes.shape({
      supplementaryDocs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          criteria: PropTypes.string,
          filterId: PropTypes.string,
          fileId: PropTypes.string,
          isil: PropTypes.string,
          filename: PropTypes.string,
          created: PropTypes.string,
        }),
      ),
    }),
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

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

  renderDocs = (docs) => {
    return docs.map(doc => (
      <DocumentCard
        key={doc.id}
        onDownloadFile={this.handleDownloadFile(doc)}
        {...doc}
      />
    ));
  }

  render() {
    const { filter, filterShape: { supplementaryDocs = [] } } = this.props;
    const filterId = filter.id;

    return (
      <React.Fragment>
        <Row>
          Hallo FilterSupplementaryView
        </Row>
        <Row>
          Filter-ID:
          {filterId}
        </Row>
        <Row>
          {supplementaryDocs.length ?
            this.renderDocs(supplementaryDocs) :
            'no files'
          }
        </Row>
      </React.Fragment>
    );
  }
}
export default FilterSupplementaryView;
