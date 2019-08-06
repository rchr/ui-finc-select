import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Accordion,
  Badge,
  Layout,
  MultiColumnList,
  Row
} from '@folio/stripes/components';
// import { DocumentCard } from '@folio/stripes-erm-components';
import DocumentCard from '../../DocumentsFieldArray/DocumentCard';
import Spinner from '../../DocumentsFieldArray/Spinner';

class FilterSupplementaryView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    parentResources: PropTypes.object,
    filterFiles: PropTypes.object,
    filter: PropTypes.object.isRequired,
    record: PropTypes.shape({
      docs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          criteria: PropTypes.string,
          filterId: PropTypes.string,
          fileId: PropTypes.string.isRequired,
          isil: PropTypes.string.isRequired,
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
        // download is starting without clicking on file-element
        // onDownloadFile={this.handleDownloadFile(doc)}
        {...doc}
      />
    ));
  }

  renderBadge = () => {
    // const count = get(this.props.record, ['docs', 'length']);
    const count = this.props.filterFiles.length;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  }

  getData(resourceName) {
    const { parentResources } = this.props;
    const records = (parentResources[`${resourceName}`] || {}).records || [];
    if (!records || records.length === 0) return null;
    return records;
  }

  render() {
    const { filterFiles, filter } = this.props;
    const filterId = filter.id;
    // const { docs = [] } = this.props.record;
    // get all FliterFiles with the filterId of the selected filter-record
    const currentFilterFiles = filterFiles.filter(row => {
      return row.filter === filterId;
    });

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={filterId}
        label="coreDocs"
        onToggle
        open
      >
        <Layout className="padding-bottom-gutter">
          { currentFilterFiles.length ? this.renderDocs(currentFilterFiles) : 'coreDocs.none' }
        </Layout>
        <Row>
          Filter-ID:
          {filterId}
        </Row>
        <Row>
          <MultiColumnList
            contentData={currentFilterFiles}
            isEmptyMessage="no filter files"
            visibleColumns={['label', 'criteria', 'filter', 'file']}
            columnMapping={{
              label: 'Filter file',
              criteria: 'Filter Criteria',
              filter: 'Filter ID',
              file: 'File ID'
            }}
          />
        </Row>
      </Accordion>
    );
  }
}
export default FilterSupplementaryView;
