import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  TextField,
  Row,
  Col,
} from '@folio/stripes/components';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Field } from 'redux-form';

// import CredentialsSettingsForm from './CredentialsSettingsForm';

import { Required } from '../components/DisplayUtils/Validate';

class CredentialsSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.object,
    // mutator: PropTypes.shape({
    //   ezbCredentials: PropTypes.shape({
    //     POST: PropTypes.func.isRequired,
    //   }).isRequired,
    // }).isRequired,
  };
  // static propTypes = {
  //   stripes: PropTypes.shape({
  //     hasPerm: PropTypes.func.isRequired,
  //     okapi: PropTypes.object.isRequired,
  //   }).isRequired,
  // };

  static manifest = Object.freeze({
    ezbCredentials: {
      type: 'okapi',
      path: 'finc-select/ezb-credentials',
    },
  });

  // static defaultProps = {
  //   handlers: {},
  // }

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);

    this.styles = {
      credentialsFormWrapper: {
        width: '100%',
      },
      credentialsFormHeight: {
        height: '100%',
      },
    };
  }

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'ezbCredentials.records[0]');

    return initialValues;
  }

  // handleSubmit = (filter) => {
  //   const { history, location, mutator } = this.props;
  //   const collectionIdsForSave = filter.collectionIds;
  //   // remove collectionIds for saving filter
  //   const filterForSave = _.omit(filter, ['collectionIds']);

  //   mutator.filters
  //     .PUT(filterForSave)
  //     .then(({ id }) => {
  //       if (collectionIdsForSave) {
  //         saveCollectionIds(id, collectionIdsForSave, this.props.stripes.okapi);
  //       }
  //       history.push(`${urls.filterView(id)}${location.search}`);
  //     });
  // }

  beforeSave = (data) => {
    const {
      user,
      password,
      libId,
      isil,
    } = data;

    return JSON.stringify({
      user,
      password,
      libId,
      isil,
    });
  }

  render() {
    return (
      <div
        data-test-settings-ezb-credentials
        style={this.styles.credentialsFormWrapper}
      >
        {/* <CredentialsSettingsForm
          ezbCredentials={_.get(resources, 'ezbCredentials.records[0]')}
          initialValues={this.getInitialValues()}
          onSubmit={this.handleSubmit}
          stripes={stripes}
        /> */}
        <this.configManager
          getInitialValues={this.getInitialValues}
          label="EZB credentials"
          moduleName="FINC-CONFIG"
          configName="ezb-credentials"
          onBeforeSave={this.beforeSave}
        >
          <Row>
            <Col xs={8}>
              <Field
                component={TextField}
                fullWidth
                id="addezbcredentials_user"
                label={
                  <FormattedMessage id="ui-finc-select.settings.ezbCredentials.user">
                    {(msg) => msg + ' *'}
                  </FormattedMessage>}
                name="user"
                placeholder="Enter a user"
                validate={Required}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Field
                component={TextField}
                fullWidth
                id="addezbcredentials_password"
                label={
                  <FormattedMessage id="ui-finc-select.settings.ezbCredentials.password">
                    {(msg) => msg + ' *'}
                  </FormattedMessage>}
                name="password"
                placeholder="Enter a password"
                validate={Required}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Field
                component={TextField}
                fullWidth
                id="addezbcredentials_libId"
                label={
                  <FormattedMessage id="ui-finc-select.settings.ezbCredentials.libId">
                    {(msg) => msg + ' *'}
                  </FormattedMessage>}
                name="libId"
                placeholder="Enter a libId"
                validate={Required}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Field
                component={TextField}
                fullWidth
                id="addezbcredentials_isil"
                label={
                  <FormattedMessage id="ui-finc-select.settings.ezbCredentials.isil">
                    {(msg) => msg}
                  </FormattedMessage>}
                name="isil"
                placeholder="Enter a isil"
              />
            </Col>
          </Row>
        </this.configManager>
      </div>
    );
  }
}

export default CredentialsSettings;
