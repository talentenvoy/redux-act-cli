const Util = require('./util');

const flc = Util.firstLetterCaps;

module.exports = function generateReducers(model, plural) {
  return `\
import { createReducer } from 'redux-act';
import {
  fetch${flc(model)}${plural ? 's' : ''},
  fetch${flc(model)}${plural ? 's' : ''}Success,
  fetch${flc(model)}${plural ? 's' : ''}Error,
  startCreating${flc(model)},
  performCreating${flc(model)},
  create${flc(model)}Success,
  create${flc(model)}Error,
  startEditing${flc(model)},
  performEditing${flc(model)},
  edit${flc(model)}Success,
  edit${flc(model)}Error,
  startDeleting${flc(model)},
  performDeleting${flc(model)},
  delete${flc(model)}Success,
  delete${flc(model)}Error
} from './actions'

const initialState = {
  ${model}${plural ? 's' : ''}: [],
  isFetching${flc(model)}${plural ? 's' : ''}: true,
  errorPresent: false,
  creating${flc(model)}: false,
  isCreating${flc(model)}: false,
  editing${flc(model)}: null,
  isEditing${flc(model)}: false,
  deleting${flc(model)}: null,
  isDeleting${flc(model)}: false
};

const spreadState = (state, obj) => ({
  ...state,
  ...(typeof obj === 'function' ? obj() : obj)
});

const reducer = {
  [fetch${flc(model)}${plural ? 's' : ''}]: state => spreadState(state, {
    errorPresent: false,
    isFetching${flc(model)}${plural ? 's' : ''}: true,
  }),
  [fetch${flc(model)}${plural ? 's' : ''}Success]: (state, ${model}${plural ? 's' : ''}) => spreadState(state, {
    ${model}${plural ? 's' : ''},
    isFetching${flc(model)}${plural ? 's' : ''}: false,
  }),
  [fetch${flc(model)}${plural ? 's' : ''}Error]: (state, ${model}${plural ? 's' : ''}) => spreadState(state, {
    errorPresent: true,
    isFetching${flc(model)}${plural ? 's' : ''}: false,
  }),
  [startCreating${flc(model)}]: state => spreadState(state, {
    creating${flc(model)}: true
  }),
  [performCreating${flc(model)}]: state => spreadState(state, {
    isCreating${flc(model)}: true
  }),
  [create${flc(model)}Success]: (state, created${flc(model)}) => spreadState(state, {
    ${model}${plural ? 's' : ''}: state.${model}${plural ? 's' : ''}.concat(created${flc(model)}),
    creating${flc(model)}: false,
    isCreating${flc(model)}: false
  }),
  [create${flc(model)}Error]: state => spreadState(state, {
    isCreating${flc(model)}: false
  }),
  [startEditing${flc(model)}]: (state, editing${flc(model)}) => spreadState(state, {
    editing${flc(model)}
  }),
  [performEditing${flc(model)}]: state => spreadState(state, {
    isEditing${flc(model)}: true
  }),
  [edit${flc(model)}Success]: (state, edited${flc(model)}) => spreadState(state, () => {
    const { ${model}${plural ? 's' : ''} } = state;
    const index = ${model}${plural ? 's' : ''}
      .findIndex((${model}, i) => ${model}.id === edited${flc(model)}.id);
    return {
      ...state,
      ${model}${plural ? 's' : ''}: [
        ...state.${model}${plural ? 's' : ''}.slice(0, index),
        edited${flc(model)},
        ...state.${model}${plural ? 's' : ''}.slice(index + 1, state.${model}${plural ? 's' : ''}.length)
      ],
      editing${flc(model)}: null,
      isEditing${flc(model)}: false
    };
  }),
  [edit${flc(model)}Error]: state => spreadState(state, {
    isEditing${flc(model)}: false
  }),
  [startDeleting${flc(model)}]: (state, deleting${flc(model)}) => spreadState(state, {
    deleting${flc(model)}
  }),
  [performDeleting${flc(model)}]: state => spreadState(state, {
    isDeleting${flc(model)}: true
  }),
  [delete${flc(model)}Success]: (state, deleted${flc(model)}) => spreadState(state, {
    ${model}${plural ? 's' : ''}: state.${model}${plural ? 's' : ''}
      .filter(${model} => ${model}.id !== deleted${flc(model)}.id),
    deleting${flc(model)}: null,
    isDeleting${flc(model)}: false
  }),
  [delete${flc(model)}Error]: state => spreadState(state, {
    isDeleting${flc(model)}: false
  }),
};

export default createReducer(reducer, initialState);
`;
}