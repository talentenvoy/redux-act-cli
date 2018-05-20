const Util = require('./util');

const flc = Util.firstLetterCaps;
const tup = Util.toUpperCase;

module.exports = function generateSagas(model, plural, requestURL) {
  return `\
import { fork } from 'redux-saga/effects';

import {
  genericFetcher,
  genericEdit,
  genericDelete,
  genericPost
} from 'containers/App/genericSagas';

import {
  fetch${flc(model)}${plural ? 's' : ''},
  fetch${flc(model)}${plural ? 's' : ''}Success,
  fetch${flc(model)}${plural ? 's' : ''}Error,
  performCreating${flc(model)},
  create${flc(model)}Success,
  create${flc(model)}Error,
  performEditing${flc(model)},
  edit${flc(model)}Success,
  edit${flc(model)}Error,
  performDeleting${flc(model)},
  delete${flc(model)}Success,
  delete${flc(model)}Error
} from './actions';

const requestURL = '${requestURL}';
const modelName = '${model}';

export default function* main() {
  yield fork(
    genericFetcher(
      fetch${flc(model)}${plural ? 's' : ''},
      fetch${flc(model)}${plural ? 's' : ''}Success,
      fetch${flc(model)}${plural ? 's' : ''}Error,
      requestURL,
      modelName
    )
  );

  yield fork(
    genericPost(
      performCreating${flc(model)},
      create${flc(model)}Success,
      create${flc(model)}Error,
      requestURL,
      modelName
    )
  );

  yield fork(
    genericEdit(
      performEditing${flc(model)},
      edit${flc(model)}Success,
      edit${flc(model)}Error,
      requestURL,
      modelName,
      []
    )
  );

  yield fork(
    genericDelete(
      performDeleting${flc(model)},
      delete${flc(model)}Success,
      delete${flc(model)}Error,
      requestURL,
      modelName
    )
  );
}
`;
}