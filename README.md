# react-redux-act-cli
A potential cli that will automate the process of writing actions, reducers and sagas in your react projects that are consuming redux and redux-act

1. yarn (or) npm i
2. const model = 'product'; // set your model name here
3. const plural = true; // specify if the model is singular or plural
4. yarn start (or) npm start

# version 1.0.1
1. Create lib folder to separate files.
2. create util.js file to separate utility logic in form of static class methods.
3. Create action.js and reducer.js to separate action, reducer generation logic.

# version 1.0.0
1. Automate the process of generating actions and reducers by passing the model name and plural as inputs.
2. Plan for next release: Get the model name and plural values from the command line using commander.
