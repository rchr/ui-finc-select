import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  List
} from '@folio/stripes/components';

import ViewCollections from './FindCollections/ViewCollections';

class CollectionsView extends React.Component {
  static propTypes = {
    listedPermissions: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      config: PropTypes.shape({
        showPerms: PropTypes.bool,
        listInvisiblePerms: PropTypes.bool,
      }).isRequired,
    }).isRequired,
    filter: PropTypes.object,
  };

  renderList() {
    const {
      stripes,
      listedPermissions,
    } = this.props;
    const showPerms = _.get(stripes, ['config', 'showPerms']);
    const listFormatter = item => ((
      <li key={item.permissionName}>
        {
          (showPerms ?
            `${item.permissionName} (${item.displayName})` :
            (item.displayName || item.permissionName))
        }
      </li>
    ));
    const noPermissionsFound = <FormattedMessage id="ui-finc-select.filter.collections.empty" />;

    return (
      <List
        items={(listedPermissions || []).sort((a, b) => {
          const key = showPerms ? 'permissionName' : 'displayName';
          if (Object.prototype.hasOwnProperty.call(a, key) &&
            Object.prototype.hasOwnProperty.call(b, key)) {
            return (a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1);
          }
          return 1;
        })}
        itemFormatter={listFormatter}
        isEmptyMessage={noPermissionsFound}
      />
    );
  }

  render() {
    const collectionIds = _.get(this.props.filter, 'collectionIds', '-');
    const filterId = _.get(this.props.filter, 'id', '-');

    // console.log(collectionIds);
    return (
      <React.Fragment>
        {/* {this.renderList()} */}
        {collectionIds}
        <div>
          <ViewCollections
            name="collectionIds"
            filterId={filterId}
            isEditable={false}
            // intialSource={this.state.source}
            stripes={this.props.stripes}
            {...this.props}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionsView;
