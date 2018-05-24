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

import ViewTable from 'myComponents/ViewTable';

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
        <ViewTable
          columnData={columnData}
          dataArray={${model}${plural ? 's' : ''}}
          totalCount={totalCount}
          isLoading={isFetching${flc(model)}${plural ? 's' : ''}}
          fetchFunction={fetch${flc(model)}${plural ? 's' : ''}}
          defaultOrderByProp="id"
          heading="All ${flc(model)}${plural ? 's' : ''}"
          searchableColumns={searchableColumns}
        />
      </div>
    );
  }
}

${flc(model)}.propTypes = {
  ${model}: PropTypes.object.isRequired,
  fetch${flc(model)}${plural ? 's' : ''}: PropTypes.func.isRequired,
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