const Util = require('./util');

const flc = Util.firstLetterCaps;
const tup = Util.toUpperCase;

module.exports = function generateComponent(model, plural, requestURL) {
  return `\
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ActionTable from 'myComponents/ActionTable';
import CreateModalHOC from 'myComponents/CreateModalHOC';
import EditModalHOC from 'myComponents/EditModalHOC';
import DeleteModalHOC from 'myComponents/DeleteModalHOC';

import makeSelect${flc(model)} from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

const columnData = [

];

const searchableColumns = [

];

const creatableFields = [

];

const createValidation = values => {
  const errors = {};
  creatableFields.forEach(({ id: param }) => {
    if (!values[param]) {
      errors[param] = 'Required';
    } else if (values[param] && !String(values[param]).trim()) {
      errors[param] = 'Required';
    }
  });
  return errors;
};

export class ${flc(model)} extends React.Component {
  componentDidMount() {
    this.props.fetch${flc(model)}${plural ? 's' : ''}();
  }

  onSubmitCreate = values => {
    this.props.performCreating${flc(model)}(values);
  }

  onSubmitEdit = values => {
    this.props.performEditing${flc(model)}(
      this.props.${model}.editing${flc(model)},
      values
    );
  }

  onSubmitDelete = () => {
    this.props.performDeleting${flc(model)}(
      this.props.${model}.deleting${flc(model)}
    );
  }

  renderModals = () => {
    const {
      ${model}: {
        creating${flc(model)},
        isCreating${flc(model)},
        editing${flc(model)},
        isEditing${flc(model)},
        deleting${flc(model)},
        isDeleting${flc(model)}
      },
      cancelOperation
    } = this.props;
    if (creating${flc(model)}) {
      const CreateModal = CreateModalHOC(
        'create_${model}',
        createValidation,
        creatableFields,
        'CREATE ${tup(model)}'
      );
      return (
        <CreateModal
          onSubmit={this.onSubmitCreate}
          loading={isCreating${flc(model)}}
          onCancel={cancelOperation}
        />
      );
    } else if (editing${flc(model)}) {
      const EditModal = EditModalHOC(
        'edit_${model}',
        createValidation,
        creatableFields,
        'EDIT ${tup(model)}',
        editing${flc(model)}
      );
      return (
        <EditModal
          onSubmit={this.onSubmitEdit}
          loading={isEditing${flc(model)}}
          onCancel={cancelOperation}
        />
      );
    } else if (deleting${flc(model)}) {
      const DeleteModal = DeleteModalHOC(
        'Delete ${flc(model)}',
        <p>Do you want to Delete ${model} <strong>{deleting${flc(model)}.id}?</strong></p>
      );
      return (
        <DeleteModal
          onDelete={this.onDelete}
          loading={isDeleting${flc(model)}}
          onCancel={cancelOperation}
        />
      );
    }
    return null;
  }

  onDelete = () => {
    this.props.performDeleting${flc(model)}(this.props.${model}.deleting${flc(model)});
  }

  render() {
    const {
      fetch${flc(model)}${plural ? 's' : ''},
      ${model}: {
        ${model}${plural ? 's' : ''},
        isFetching${flc(model)}${plural ? 's' : ''},
        totalCount
      }
    } = this.props;
    return (
      <div className="app-wrapper">
        {this.renderModals()}
        <ActionTable
          columnData={columnData}
          dataArray={${model}${plural ? 's' : ''}}
          totalCount={totalCount}
          isLoading={isFetching${flc(model)}${plural ? 's' : ''}}
          fetchFunction={fetch${flc(model)}${plural ? 's' : ''}}
          defaultOrderByProp="id"
          heading="All ${flc(model)}${plural ? 's' : ''}"
          searchableColumns={searchableColumns}
          onCreate={this.props.startCreating${flc(model)}}
          onEdit={this.props.startEditing${flc(model)}}
          onDelete={this.props.startDeleting${flc(model)}}
        />
      </div>
    );
  }
}

${flc(model)}.propTypes = {
  ${model}: PropTypes.object.isRequired,
  fetch${flc(model)}${plural ? 's' : ''}: PropTypes.func.isRequired,
  cancelOperation: PropTypes.func.isRequired,
  startCreating${flc(model)}: PropTypes.func.isRequired,
  performCreating${flc(model)}: PropTypes.func.isRequired,
  startEditing${flc(model)}: PropTypes.func.isRequired,
  performEditing${flc(model)}: PropTypes.func.isRequired,
  startDeleting${flc(model)}: PropTypes.func.isRequired,
  performDeleting${flc(model)}: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  ${model}: makeSelect${flc(model)}(),
});

const mapDispatchToProps = bindActionCreators.bind(this, actions);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: '${model}', reducer });
const withSaga = injectSaga({ key: '${model}', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(${flc(model)});
`;
};