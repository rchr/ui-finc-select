import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import {
  Button,
  Modal,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import css from './CollectionsModal.css';

class CollectionsModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Modal
        open={open}
        id="collections-modal"
        dismissible
        label={<FormattedMessage id="ui-finc-select.filter.collections.modal.header" />}
        size="large"
        showHeader
        onClose={onClose}
        contentClass={css.modalContent}
        footer={
          <div>
            <Button
              id="clickable-collections-modal-cancel"
              data-test-collections-modal-cancel
              onClick={onClose}
              marginBottom0
            >
              <FormattedMessage id="ui-finc-select.filter.collections.modal.cancel" />
            </Button>
            <Button
              id="clickable-collections-modal-save"
              data-test-collections-modal-save
              marginBottom0
              buttonStyle="primary"
              onClick={this.onSave}
            >
              <FormattedMessage id="ui-finc-select.filter.collections.modal.save" />
            </Button>
          </div>
        }
      >
        <div>
          <Paneset>
            <Pane
              paneTitle={<FormattedMessage id="ui-finc-select.filter.collections.modal.list.pane.header" />}
              defaultWidth="fill"
            >
              <div>
                Pane content
              </div>
            </Pane>
          </Paneset>
        </div>
      </Modal>
    );
  }
}

export default stripesConnect(CollectionsModal);
