import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

export default class GeneralSettings extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={this.props.label}
      >
        <div data-test-application-settings-general-message>
          <FormattedMessage id="ui-finc-select.settings.general.message" />
        </div>
      </Pane>
    );
  }
}
