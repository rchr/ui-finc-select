import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import CredentialsSettings from './CredentialsSettings';

export default class FincConfigSettings extends React.Component {
  pages = [
    {
      component: CredentialsSettings,
      label: <FormattedMessage id="ui-finc-select.settings.ezbCredentials.label" />,
      route: 'credentials',
    }
  ];

  render() {
    return (
      <Settings
        data-test-settings-finc-select
        pages={this.pages}
        paneTitle="Finc select"
        {...this.props}
      />
    );
  }
}
