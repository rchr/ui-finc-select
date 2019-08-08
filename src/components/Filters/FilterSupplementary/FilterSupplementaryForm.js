import React from 'react';
import PropTypes from 'prop-types';
import stripesForm from '@folio/stripes/form';
import {
  Field,
  FieldArray
} from 'redux-form';
// import { DocumentsFieldArray } from '@folio/stripes-erm-components';
import {
  Button,
  Col,
  Modal,
  Pane,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';
import DocumentsFieldArray from '../../DocumentsFieldArray/DocumentsFieldArray';
import FilterSupplementarySubform from './FilterSupplementarySubform';

class FilterSupplementaryForm extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    // mutator: PropTypes.shape({
    //   newFilterFiles: PropTypes.object,
    // }),
    parentMutator: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
      connect: PropTypes.func.isRequired,
    }).isRequired,
    filterFiles: PropTypes.arrayOf(PropTypes.object),
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.connectedFilterSupplementarySubform = this.props.stripes.connect(FilterSupplementarySubform);


    this.state = {
      fileId: '',
      showInfoModal: false,
      modalText: ''
    };

    this.successText = 'success';
    this.failText = 'fail';
  }

  onUploadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    const formData = new FormData();

    formData.append('upload', file);

    return fetch(`${okapi.url}/finc-select/files`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/octet-stream'
      },
      body: formData,
    })
    // hier wird ID zurückgegeben, daher ist der response in FileUploaderField unbekannt
    // get id of the uploaded file, on which the file is saved in the database
      .then(response => {
        return response.text();
      })
      .then(data => {
        this.setState({ fileId: data });
        // const fileId = data;
        // console.log(fileId);
      });
  }

  doSomething = () => {
    this.setState(
      {
        showInfoModal: true,
        modalText: 'modal text'
      }
    );
  }

  handleClose = () => {
    this.setState({ showInfoModal: false });
  }

  render() {
    const { filter, stripes, filterFiles, pristine, submitting, parentMutator } = this.props;
    const filterId = filter.id;

    const buttonDef = (
      <Button
        onClick={() => this.doSomething()}
        // onClick={() => this.onUploadFile()}
      >
        { 'open Modal' }
      </Button>
    );

    return (
      // <FilterSupplementarySubform
      //   id="subform"
      //   filterFiles={filterFiles.records}
      // />
      <this.connectedFilterSupplementarySubform
        stripes={stripes}
        filterFiles={filterFiles.records}
        filterId={filterId}
        fileId={this.state.fileId}
        parentMutator={parentMutator}
      />
    );
  }
}
export default FilterSupplementaryForm;
