import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  MultiColumnList,
  Row
} from '@folio/stripes/components';

class FilterFileDownload extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    filterFiles: PropTypes.object,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  render() {
    const { filterFiles, id } = this.props;

    return (
      <React.Fragment>
        {/* show list of all files with the filter-id */}
        <Row>
          {/* <Col xs={6}> */}
          <MultiColumnList
            contentData={filterFiles}
            isEmptyMessage="no filter files"
            visibleColumns={['label', 'criteria', 'filter', 'file']}
            columnMapping={{
              label: 'Filter file',
              criteria: 'Filter Criteria',
              filter: 'Filter ID',
              file: 'File ID'
            }}
          />
          {/* </Col> */}
        </Row>
      </React.Fragment>
    );
  }
}

export default FilterFileDownload;
