import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Col,
  Button,
  KeyValue,
  Modal
} from '@folio/stripes/components';

class SelectUnselect extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    collectionId: PropTypes.string.isRequired,
    selectedInitial: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.okapiUrl = props.stripes.okapi.url;
    this.httpHeaders = Object.assign({}, {
      'X-Okapi-Tenant': props.stripes.okapi.tenant,
      'X-Okapi-Token': props.stripes.store.getState().okapi.token,
      'Content-Type': 'application/json'
    });

    const s = props.selectedInitial;
    this.state = {
      showInfoModal: false,
      modalText: '',
      selected: false,
      selectedString: this.getSelectedValue(s),
      selectedLabel: this.getSelectedButtonLable(s)
    };
  }

  // get initial-selected-value as a property
  // but need the selected-value also as a state for futher working and changing its value
  componentDidMount() {
    const { selectedInitial } = this.props;
    this.setState(
      {
        selected: selectedInitial
      }
    );
  }

  // if clicking on another collection, check, if selectedInitial will be up to date
  componentDidUpdate(prevProps) {
    if (this.props.collectionId !== prevProps.collectionId) {
      this.fetchSelected(this.props.collectionId, this.props.selectedInitial);
    }
  }

  fetchSelected = (collectionId, selected) => {
    const selectedButtonLable = this.getSelectedButtonLable(selected);
    const selectedValue = this.getSelectedValue(selected);

    // change state for selected-values, if neccessary
    this.setState(
      {
        // shortcut for selected: selected,
        selected,
        selectedString: selectedValue,
        selectedLabel: selectedButtonLable
      }
    );
  }

  // get strings from the saved bool value
  getSelectedValue(s) {
    return s ? 'Yes' : 'No';
  }

  getSelectedButtonLable(s) {
    return s ? 'Unselect' : 'Select';
  }

  // inverse values for json
  inversJsonBoolean(s) {
    return s ? { select: false } : { select: true };
  }

  selectUnselect = (collectionId, selected) => {
    const selectedJson = JSON.stringify(this.inversJsonBoolean(selected));
    const inverseSelected = !selected;
    const invertSelectedButtonLable = this.getSelectedButtonLable(inverseSelected);
    const inverseSelectedValue = this.getSelectedValue(inverseSelected);

    fetch(`${this.okapiUrl}/finc-select/metadata-collections/${collectionId}/select`,
      {
        headers: this.httpHeaders,
        method: 'PUT',
        body: selectedJson
      })
      .then((response) => {
        if (response.status >= 400) {
          // show 400 error
          this.setState(
            {
              showInfoModal: true,
              modalText: 'Error 4xx: Selecting this metadata collection is not permitted'
            }
          );
        } else if (response.status < 400 && response.status >= 300) {
          // show 300 error
          this.setState(
            {
              showInfoModal: true,
              modalText: 'Error 3xx'
            }
          );
        } else if (response.status < 300 && response.status >= 200) {
          // show success
          this.setState(
            {
              selected: inverseSelected,
              selectedString: inverseSelectedValue,
              selectedLabel: invertSelectedButtonLable
            }
          );
        }
      });
  }

  handleClose = () => {
    this.setState({ showInfoModal: false });
  }

  render() {
    const { collectionId } = this.props;

    return (
      <React.Fragment>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-finc-select.collection.selected" />}
            value={this.state.selectedString}
          />
        </Col>
        <Col xs={3}>
          <Button
            id="unselect"
            buttonStyle="primary"
            onClick={() => this.selectUnselect(collectionId, this.state.selected)}
          >
            {this.state.selectedLabel}
          </Button>
        </Col>
        <Modal
          open={this.state.showInfoModal}
          label="Select/Unselect Collection"
        >
          <div>
            { this.state.modalText }
          </div>
          <Button
            onClick={this.handleClose}
          >
            OK
          </Button>
        </Modal>
      </React.Fragment>
    );
  }
}
export default SelectUnselect;
