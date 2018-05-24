const fs = require('fs-extra');
const path = require('path');
const generateActions = require('./action');
const generateReducers = require('./reducer');
const generateSagas = require('./saga');
const generateComponent = require('./component');
const generateBasicComponent = require('./basic_component');

const model = 'candidate';
const plural = false;

const compiledActions = generateActions(model, plural);
const compiledReducers = generateReducers(model, plural);
const compiledSagas = generateSagas(model, plural, '/api/findByMailId');
const compiledComponent = generateComponent(model, plural);
const compiledBasicComponent = generateBasicComponent(model, plural);

try {
  fs.outputFileSync(`${__dirname}/../output/actions.js`, compiledActions, { flag: 'wx' });
} catch (e) {
  fs.outputFileSync(`${__dirname}/../output/actions.js`, compiledActions, { flag: 'w' });
}

try {
  fs.outputFileSync(`${__dirname}/../output/reducers.js`, compiledReducers, { flag: 'wx' });
} catch (e) {
  fs.outputFileSync(`${__dirname}/../output/reducers.js`, compiledReducers, { flag: 'w' });
}

try {
  fs.outputFileSync(`${__dirname}/../output/sagas.js`, compiledSagas, { flag: 'wx' });
} catch (e) {
  fs.outputFileSync(`${__dirname}/../output/sagas.js`, compiledSagas, { flag: 'w' });
}

try {
  fs.outputFileSync(`${__dirname}/../output/component.js`, compiledComponent, { flag: 'wx' });
} catch (e) {
  fs.outputFileSync(`${__dirname}/../output/component.js`, compiledComponent, { flag: 'w' });
}

try {
  fs.outputFileSync(`${__dirname}/../output/basic_component.js`, compiledBasicComponent, { flag: 'wx' });
} catch (e) {
  fs.outputFileSync(`${__dirname}/../output/basic_component.js`, compiledBasicComponent, { flag: 'w' });
}