const Util = require('./util');

const flc = Util.firstLetterCaps;
const tup = Util.toUpperCase;

module.exports = function generateActions(model, plural) {
  return `\
import { createAction } from 'redux-act';

export const PREFIX = 'APP_${tup(model)}${plural ? 'S' : ''}_PAGE';

export const fetch${flc(model)}${plural ? 's' : ''} = createAction(
  \`\${PREFIX}_FETCH_${tup(model)}${plural ? 'S' : ''}\`
);
export const fetch${flc(model)}${plural ? 's' : ''}Success = createAction(
  \`\${PREFIX}_FETCH_${tup(model)}${plural ? 'S' : ''}_SUCCESS\`,
  ${model} => ${model}
);
export const fetch${flc(model)}${plural ? 's' : ''}Error = createAction(
  \`\${PREFIX}_FETCH_${tup(model)}${plural ? 'S' : ''}_ERROR\`
);

export const startCreating${flc(model)} = createAction(
  \`\${PREFIX}_START_CREATING_${tup(model)}\`
);
export const performCreating${flc(model)} = createAction(
  \`\${PREFIX}_PERFORM_CREATING_${tup(model)}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const create${flc(model)}Success = createAction(
  \`\${PREFIX}_CREATE_${tup(model)}_SUCCESS\`,
  values => values
);
export const create${flc(model)}Error = createAction(
  \`\${PREFIX}_CREATE_${tup(model)}_ERROR\`
);

export const startEditing${flc(model)} = createAction(
  \`\${PREFIX}_START_EDITING_${tup(model)}\`
);
export const performEditing${flc(model)} = createAction(
  \`\${PREFIX}_PERFORM_EDITING_${tup(model)}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const edit${flc(model)}Success = createAction(
  \`\${PREFIX}_EDIT_${tup(model)}_SUCCESS\`,
  values => values
);
export const edit${flc(model)}Error = createAction(
  \`\${PREFIX}_EDIT_${tup(model)}_ERROR\`
);

export const startDeleting${flc(model)} = createAction(
  \`\${PREFIX}_START_DELETING_${tup(model)}\`
);
export const performDeleting${flc(model)} = createAction(
  \`\${PREFIX}_PERFORM_DELETING_${tup(model)}\`,
  (values, successCallback, errorCallback, callback) => ({
    values,
    successCallback,
    errorCallback,
    callback
  })
);
export const delete${flc(model)}Success = createAction(
  \`\${PREFIX}_DELETE_${tup(model)}_SUCCESS\`,
  values => values
);
export const delete${flc(model)}Error = createAction(
  \`\${PREFIX}_DELETE_${tup(model)}_ERROR\`
);
`;
}