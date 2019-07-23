import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Icon,
  KeyValue,
  Pane,
  Row
} from '@folio/stripes/components';
import {
  TitleManager
} from '@folio/stripes/core';

class FilterView extends React.Component {
  static manifest = Object.freeze({
    query: {},
  });

  static propTypes = {
    stripes: PropTypes
      .shape({
        hasPerm: PropTypes.func,
        connect: PropTypes.func.isRequired,
        logger: PropTypes
          .shape({ log: PropTypes.func.isRequired })
          .isRequired
      })
      .isRequired,
    paneWidth: PropTypes.string,
    resources: PropTypes.shape({
      metadataCollection: PropTypes.shape(),
      query: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    parentResources: PropTypes.shape(),
    onClose: PropTypes.func
  };

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const collection = (parentResources.records || {}).records || [];
    if (!collection || collection.length === 0 || !id) return null;
    return collection.find(u => u.id === id);
  }

  render() {
    const initialValues = this.getData();

    if (_.isEmpty(initialValues)) {
      return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    } else {
      const label = _.get(initialValues, 'label', '-');

      return (
        <Pane
          defaultWidth={this.props.paneWidth}
          id="pane-collectiondetails"
          paneTitle={<span data-test-collection-header-title>{label}</span>}
          dismissible
          onClose={this.props.onClose}
        >
          <TitleManager record={label} />
          <div id="filterDetails">
            <Row>
              <KeyValue
                label={<FormattedMessage id="ui-finc-select.filter.label" />}
                value={_.get(initialValues, 'label', '-')}
              />
            </Row>
            <Row>
              <KeyValue
                label={<FormattedMessage id="ui-finc-select.filter.type" />}
                value={_.get(initialValues, 'type', '-')}
              />
            </Row>
          </div>
        </Pane>
      );
    }
  }
}

export default FilterView;
