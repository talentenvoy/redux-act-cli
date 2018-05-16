const fs = require('fs-extra');
const path = require('path');
const generateActions = require('./action');
const generateReducers = require('./reducer');

const model = 'candidate';
const plural = true;

const compiledActions = generateActions(model, plural);
const compiledReducers = generateReducers(model, plural);

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