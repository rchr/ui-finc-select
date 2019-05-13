import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Settings from './settings';
import Main from './Main';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class FincSelect extends React.Component {
  static propTypes = {
    stripes: PropTypes
      .shape({ connect: PropTypes.func.isRequired })
      .isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  }

  /* set stripes.connect for manifest in MyDataClass (to get data from okapi) */
  constructor(props, context) {
    super(props, context);
    this.connectedApp = props.stripes.connect(Main);
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          render={() => <this.connectedApp {...this.props} />}
        />
        <Route component={() => { this.NoMatch(); }} />
      </Switch>
    );
  }
}

export default FincSelect;
