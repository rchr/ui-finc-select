import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const getValues = fields => {
  // Get the values from either react-final-form or redux-form
  const values = fields.getAll ? fields.getAll() : fields.value;

  return values || [];
};

export default function withKiwtFieldArray(WrappedComponent) {
  class WithKiwtFieldArray extends React.Component {
    static propTypes = {
      fields: PropTypes.shape({
        insert: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        push: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        update: PropTypes.func, // react-final-form-arrays
        value: PropTypes.array, // react-final-form-arrays
      }).isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {
        endOfList: 0, // Tracks the end of the "real" list that doesn't contain _delete entries.
      };
    }

    static getDerivedStateFromProps(props) {
      const items = getValues(props.fields).filter(line => !line._delete);
      return { endOfList: items.length };
    }

    handleAddField = (field = { _delete: false }) => {
      this.props.fields.insert(this.state.endOfList, field);
    }

    handleDeleteField = (index, field) => {
      const { fields } = this.props;

      fields.remove(index);
      this.handleMarkForDeletion(field);
    }

    handleReplaceField = (index, field) => {
      this.props.fields.update(index, field);
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
      const items = getValues(fields).slice(0, this.state.endOfList);

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
