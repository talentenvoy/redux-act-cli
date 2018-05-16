const fs = require('fs-extra');

const model = 'candidate';
const plural = true;

function firstLetterCaps(str) {
  return `${str[0].toUpperCase()}${str.slice(1, str.length).toLowerCase()}`
}

function generateActions() {
  const op = `\
import { createAction } from 'redux-act';

export const PREFIX = 'APP_${model.toUpperCase()}${plural ? 'S' : ''}_PAGE';
export const fetch${firstLetterCaps(model)}${plural ? 's' : ''} = createAction(
  \`\${PREFIX}_FETCH_${model.toUpperCase()}${plural ? 'S' : ''}\`
);
export const fetch${firstLetterCaps(model)}${plural ? 's' : ''}Success = createAction(
  \`\${PREFIX}_FETCH_${model.toUpperCase()}${plural ? 'S' : ''}_SUCCESS\`,
  ${model} => ${model}
);
export const fetch${firstLetterCaps(model)}${plural ? 's' : ''}Error = createAction(
  \`\${PREFIX}_FETCH_${model.toUpperCase()}${plural ? 'S' : ''}_ERROR\`
);
export const startCreating${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_START_CREATING_${model.toUpperCase()}\`
);
export const performCreating${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_PERFORM_CREATING_${model.toUpperCase()}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const create${firstLetterCaps(model)}Success = createAction(
  \`\${PREFIX}_CREATE_${model.toUpperCase()}_SUCCESS\`,
  values => values
);
export const create${firstLetterCaps(model)}Error = createAction(
  \`\${PREFIX}_CREATE_${model.toUpperCase()}_ERROR\`
);
export const startEditing${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_START_EDITING_${model.toUpperCase()}\`
);
export const performEditing${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_PERFORM_EDITING_${model.toUpperCase()}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const edit${firstLetterCaps(model)}Success = createAction(
  \`\${PREFIX}_EDIT_${model.toUpperCase()}_SUCCESS\`,
  values => values
);
export const edit${firstLetterCaps(model)}Error = createAction(
  \`\${PREFIX}_EDIT_${model.toUpperCase()}_ERROR\`
);
export const startDeleting${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_START_DELETING_${model.toUpperCase()}\`
);
export const performDeleting${firstLetterCaps(model)} = createAction(
  \`\${PREFIX}_PERFORM_DELETING_${model.toUpperCase()}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const delete${firstLetterCaps(model)}Success = createAction(
  \`\${PREFIX}_DELETE_${model.toUpperCase()}_SUCCESS\`,
  values => values
);
export const delete${firstLetterCaps(model)}Error = createAction(
  \`\${PREFIX}_DELETE_${model.toUpperCase()}_ERROR\`
);
`
  return op;
}

function generateReducers() {
  const result = `\
import { createReducer } from 'redux-act';
import {
  fetch${firstLetterCaps(model)}${plural ? 's' : ''},
  fetch${firstLetterCaps(model)}${plural ? 's' : ''}Success,
  fetch${firstLetterCaps(model)}${plural ? 's' : ''}Error,
  startCreating${firstLetterCaps(model)},
  performCreating${firstLetterCaps(model)},
  create${firstLetterCaps(model)}Success,
  create${firstLetterCaps(model)}Error,
  startEditing${firstLetterCaps(model)},
  performEditing${firstLetterCaps(model)},
  edit${firstLetterCaps(model)}Success,
  edit${firstLetterCaps(model)}Error,
  startDeleting${firstLetterCaps(model)},
  performDeleting${firstLetterCaps(model)},
  delete${firstLetterCaps(model)}Success,
  delete${firstLetterCaps(model)}Error
} from './actions'

const initialState = {
  ${model}${plural ? 's' : ''}: [],
  isFetching${firstLetterCaps(model)}${plural ? 's' : ''}: true,
  errorPresent: false,
  creating${firstLetterCaps(model)}: false,
  isCreating${firstLetterCaps(model)}: false,
  editing${firstLetterCaps(model)}: null,
  isEditing${firstLetterCaps(model)}: false,
  deleting${firstLetterCaps(model)}: null,
  isDeleting${firstLetterCaps(model)}: false
};

const spreadState = (state, obj) => ({
  ...state,
  ...(typeof obj === 'function' ? obj() : obj)
});

const reducer = {
  [fetch${firstLetterCaps(model)}${plural ? 's' : ''}]: state => spreadState(state, {
    errorPresent: false,
    isFetching${firstLetterCaps(model)}${plural ? 's' : ''}: true,
  }),
  [fetch${firstLetterCaps(model)}${plural ? 's' : ''}Success]: (state, ${model}${plural ? 's' : ''}) => spreadState(state, {
    ${model}${plural ? 's' : ''},
    isFetching${firstLetterCaps(model)}${plural ? 's' : ''}: false,
  }),
  [fetch${firstLetterCaps(model)}${plural ? 's' : ''}Error]: (state, ${model}${plural ? 's' : ''}) => spreadState(state, {
    errorPresent: true,
    isFetching${firstLetterCaps(model)}${plural ? 's' : ''}: false,
  }),
  [startCreating${firstLetterCaps(model)}]: state => spreadState(state, {
    creating${firstLetterCaps(model)}: true
  }),
  [performCreating${firstLetterCaps(model)}]: state => spreadState(state, {
    isCreating${firstLetterCaps(model)}: true
  }),
  [create${firstLetterCaps(model)}Success]: (state, created${firstLetterCaps(model)}) => spreadState(state, {
    ${model}${plural ? 's' : ''}: state.${model}${plural ? 's' : ''}.concat(created${firstLetterCaps(model)}),
    creating${firstLetterCaps(model)}: false,
    isCreating${firstLetterCaps(model)}: false
  }),
  [create${firstLetterCaps(model)}Error]: state => spreadState(state, {
    isCreating${firstLetterCaps(model)}: false
  }),
  [startEditing${firstLetterCaps(model)}]: (state, editing${firstLetterCaps(model)}) => spreadState(state, {
    editing${firstLetterCaps(model)}
  }),
  [performEditing${firstLetterCaps(model)}]: state => spreadState(state, {
    isEditing${firstLetterCaps(model)}: true
  }),
  [edit${firstLetterCaps(model)}Success]: (state, edited${firstLetterCaps(model)}) => spreadState(state, () => {
    const { ${model}${plural ? 's' : ''} } = state;
    const index = ${model}${plural ? 's' : ''}
      .findIndex((${model}, i) => ${model}.id === edited${firstLetterCaps(model)}.id);
    return {
      ...state,
      ${model}${plural ? 's' : ''}: [
        ...state.${model}${plural ? 's' : ''}.slice(0, index),
        edited${firstLetterCaps(model)},
        ...state.${model}${plural ? 's' : ''}.slice(index + 1, state.${model}${plural ? 's' : ''}.length)
      ],
      editing${firstLetterCaps(model)}: null,
      isEditing${firstLetterCaps(model)}: false
    };
  }),
  [edit${firstLetterCaps(model)}Error]: state => spreadState(state, {
    isEditing${firstLetterCaps(model)}: false
  }),
  [startDeleting${firstLetterCaps(model)}]: (state, deleting${firstLetterCaps(model)}) => spreadState(state, {
    deleting${firstLetterCaps(model)}
  }),
  [performDeleting${firstLetterCaps(model)}]: state => spreadState(state, {
    isDeleting${firstLetterCaps(model)}: true
  }),
  [delete${firstLetterCaps(model)}Success]: (state, deleted${firstLetterCaps(model)}) => spreadState(state, {
    ${model}${plural ? 's' : ''}: state.${model}${plural ? 's' : ''}
      .filter(${model} => ${model}.id !== deleted${firstLetterCaps(model)}.id),
    deleting${firstLetterCaps(model)}: null,
    isDeleting${firstLetterCaps(model)}: false
  }),
  [delete${firstLetterCaps(model)}Error]: state => spreadState(state, {
    isDeleting${firstLetterCaps(model)}: false
  }),
};

export default createReducer(reducer, initialState);
`;
  return result;
}

// console.log(generateActions());
// console.log(generateReducers());
try {
  fs.outputFileSync('./output/actions.js', generateActions(), { flag: 'wx' });
} catch (e) {
  fs.outputFileSync('./output/actions.js', generateActions(), { flag: 'w' });
}

try {
  fs.outputFileSync('./output/reducers.js', generateReducers(), { flag: 'wx' });
} catch (e) {
  fs.outputFileSync('./output/reducers.js', generateReducers(), { flag: 'w' });
}