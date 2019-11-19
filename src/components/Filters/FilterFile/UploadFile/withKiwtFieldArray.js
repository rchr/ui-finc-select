import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default function withKiwtFieldArray(WrappedComponent) {
  class WithKiwtFieldArray extends React.Component {
    static propTypes = {
      fields: PropTypes.shape({
        getAll: PropTypes.func.isRequired,
        insert: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        push: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
      }).isRequired,
    }

    handleAddField = (field = {}) => {
      this.props.fields.push(field);
    }

    handleDeleteField = (index, field) => {
      const { fields } = this.props;

      fields.remove(index);
      this.handleMarkForDeletion(field);
    }

    handleReplaceField = (index, field) => {
      setTimeout(() => {
        this.props.fields.remove(index);
        this.props.fields.insert(index, field.fileId);
      }, 500);
    }

    handleMarkForDeletion = (field) => {
      const { fields } = this.props;

      // set _delete true for removing file in database after conform deletion
      if (field.fileId) {
        fields.push({ label: field.label, fileId: field.fileId, _delete: true });
      }
    }

    render() {
      const { fields } = this.props;

      // Filter away items that have been marked for deletion.
      const items = (fields.getAll() || []).filter(line => !line._delete);

      return (
        <WrappedComponent
          items={items}
          name={fields.name}
          onAddField={this.handleAddField}
          onDeleteField={this.handleDeleteField}
          onMarkforDeletion={this.handleMarkForDeletion}
          onReplaceField={this.handleReplaceField}
          {...this.props}
        />
      );
    }
  }

  WithKiwtFieldArray.displayName = `WithKiwtFieldArray(${getDisplayName(WrappedComponent)})`;
  return WithKiwtFieldArray;
}
