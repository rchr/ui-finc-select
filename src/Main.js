import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Layout
} from '@folio/stripes/components';
import MetadataSources from './components/MetadataSources/MetadataSources';
import MetadataCollections from './components/MetadataCollections/MetadataCollections';
import Filters from './components/Filters/Filters';
import css from './components/BasicStyle.css';

const defaultFiltersCollections = 'permitted.yes,selected.yes';
const defaultFiltersSources = 'status.Active,status.Technical implementation';
const defaultFiltersFilters = 'type.Whitelist,type.Blacklist';

class Main extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
    stripes: PropTypes.object,
    mutator: PropTypes.object,
    resources: PropTypes.object,
    parentMutator: PropTypes.object,
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  constructor(props) {
    super(props);
    this.connectedSource = props.stripes.connect(MetadataSources);
    this.connectedCollection = props.stripes.connect(MetadataCollections);
    this.connectedFilter = props.stripes.connect(Filters);

    this.state = {
      activeTab: ''
    };
  }

  handleClick(id) {
    this.props.history.push(`/finc-select/${id}`);
  }

  render() {
    const { resources, mutator, match, stripes } = this.props;
    const currentUrl = this.props.location.pathname;
    const splitUrl = currentUrl.split('/');
    const tabInCurrentUrl = splitUrl[2];
    // set active tab always to the value in the current url
    this.state.activeTab = tabInCurrentUrl;

    return (
      <div className={css.container}>
        <Layout className={css.header}>
          <ButtonGroup tagName="nav">
            <Button
              id="metadata-sources"
              fullWidth
              onClick={() => this.handleClick(`metadata-sources?filters=${defaultFiltersSources}`)}
              buttonStyle={this.state.activeTab === 'metadata-sources' ? 'primary' : 'default'}
            >
              Sources
            </Button>
            <Button
              id="metadata-collections"
              fullWidth
              onClick={() => this.handleClick(`metadata-collections?filters=${defaultFiltersCollections}`)}
              buttonStyle={this.state.activeTab === 'metadata-collections' ? 'primary' : 'default'}
            >
              Collections
            </Button>
            <Button
              id="filters"
              fullWidth
              onClick={() => this.handleClick(`filters?filters=${defaultFiltersFilters}`)}
              buttonStyle={this.state.activeTab === 'filters' ? 'primary' : 'default'}
            >
              Filters
            </Button>
          </ButtonGroup>
        </Layout>

        <div className={css.body}>
          <Switch>
            <Route
              path={`${match.path}/metadata-sources`}
              render={props => <this.connectedSource
                stripes={stripes}
                mutator={mutator}
                resources={resources}
                {...props}
              />
              }
            />
            <Route
              path={`${match.path}/metadata-collections`}
              render={props => <this.connectedCollection
                stripes={stripes}
                mutator={mutator}
                resources={resources}
                {...props}
              />
              }
            />
            <Route
              path={`${match.path}/filters`}
              render={props => <this.connectedFilter
                stripes={stripes}
                mutator={mutator}
                resources={resources}
                {...props}
              />
              }
            />
            <Redirect exact from={`${match.path}`} to={`${match.path}/metadata-sources?filters=${defaultFiltersSources}`} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
