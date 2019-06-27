import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import {
  injectIntl,
  intlShape
} from 'react-intl';
import {
  makeQueryFunction,
  SearchAndSort
} from '@folio/stripes/smart-components';
import {
  Button,
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';
import packageInfo from '../../../../package';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

class ShowAllCollections extends React.Component {
  static manifest = Object.freeze({
    getAllCollections: {
      type: 'okapi',
      records: 'fincSelectMetadataCollections',
      path: 'finc-select/metadata-collections',
      resourceShouldRefresh: true,
      // GET: {
      //   params: {
      //     filters: 'mdSource.id==:{sourceId}'
      //   },
      // },

      // GET: {
      //   params: {
      //     query: makeQueryFunction(
      //       'cql.allRecords=1',
      //       '(label="%{query.query}*")',
      //       {
      //         'Collection Name': 'label'
      //       },
      //       // '(label="%{query.query}*")',
      //       // `(mdSource.id=${this.props.sourceId})`,
      //       // {
      //       //   'Source': 'mdSource.id'
      //       // },
      //       // filterConfig,
      //       2,
      //     ),

      //     // query=`(mdSource.id=${this.props.sourceId})`
      //   },
      //   staticFallback: { params: {} },
      // },
    },
  });

  static propTypes = {
    sourceId: PropTypes.string.isRequired,
    resources: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    stripes: PropTypes.object,
    intl: intlShape,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
  };

  handleClick(sourceId) {
    // this.props.history.push('/finc-select/metadata-collections');
  }

  render() {
    const packageInfoReWrite = () => {
      const path = '/finc-select/metadata-collections';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { stripes, intl, match } = this.props;


    const resultsFormatter = {
      label: collection => collection.label,
      mdSource: collection => _.get(collection, 'mdSource.id', '-'),
      permitted: collection => collection.permitted,
      // TODO selected: collection => collection.selected,
      filters: collection => this.getArrayElementsCommaSeparated(collection.filters),
      freeContent: collection => collection.freeContent,
    };

    return (
      <div data-test-collection-instances>
        
        {/* <Row>
          <Col xs={6}>
            <Button
              id="showAllCollections"
              buttonStyle="primary"
              onClick={() => this.handleClick(this.props.sourceId)}
            >
              showAllCollections with sourceId: {this.props.sourceId}
            </Button>
          </Col>
        </Row> */}

        {/* <SearchAndSort
          packageInfo={packageInfoReWrite()}
          objectName="metadataCollection"
          visibleColumns={['label', 'mdSource', 'permitted', 'filters', 'freeContent']}
          resultsFormatter={resultsFormatter}
          parentResources={this.props.resources}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-select.collection.label' }),
            mdSource: intl.formatMessage({ id: 'ui-finc-select.collection.mdSource' }),
            permitted: intl.formatMessage({ id: 'ui-finc-select.collection.permitted' }),
            // TODO: selected: intl.formatMessage({ id: 'ui-finc-select.collection.selected' }),
            filters: intl.formatMessage({ id: 'ui-finc-select.collection.filters' }),
            freeContent: intl.formatMessage({ id: 'ui-finc-select.collection.freeContent' })
          }}
          stripes={stripes}
        /> */}

        {/* <Route
          path="/finc-select/metadata-collections"
          render={props => <this.connectedCollection
            stripes={stripes}
            // mutator={mutator}
            // resources={resources}
            {...props}
          />
          }
        />
        <Redirect exact from={`${match.path}`} to={`${match.path}/metadata-sources`} /> */}

        <Link to={{
          pathname: '/finc-select/metadata-collections',
          // search: `?mdSource.id=${sourceId}`
          // search: `?mdSource.id=${sourceId} AND selected==true`
          search: '?filters=freeContent.Undetermined'
        }}
        >
          <span>link to cols for SourceId: {this.props.sourceId}</span>
        </Link>
      </div>
    );
  }
}
export default injectIntl(ShowAllCollections);
