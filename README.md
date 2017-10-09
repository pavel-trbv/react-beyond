# React Beyond Boilerplate
## What is this?
*Universal JS:* - JavaScript code can run both the server and client

*Hot Module Reloading*: - Replaces modules that have been changed in real time while preserving the state.

*Server Side Rendering:* - Renders Pages on the initial for fast page loads and search engine optimization.

## Technologies
* React
* Redux
* React Router
* Webpack
* Hot Module Replacement
* Babel
* Express

## Setup
Firstly, install the dependencies, in the root directory of the project, run ```npm install```

## Usage
For **Development** run ```npm run dev```

This will run development server on ```localhost:3000```, and run API server on ```localhost:3001```.
Development server includes Hot Reload for React and Redux, but not includes SSR.

For **Production** run ```npm run build && npm start```

This will create bundle ```server.js``` on root and create ```/build``` directory with bundle javascript and styles.
Production server includes SSR, but not includes Hot Reload.

## Notes
You should install ```nodemon```, run ```npm install -g nodemon```. 
Also you should run ```npm install -g webpack```.

#### License 
```MIT```
