import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';
import axios from 'axios';

import { Provider } from 'react-redux';
import createStore from 'store/createStore.js';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux'

import App from 'containers/App'
import 'styles/main.scss';

axios.defaults.baseURL = __API__;

const preloadedState = window.__INITIAL_STATE__

const history = createHistory();
const store = createStore(history, preloadedState);

const rootEl = document.getElementById('root');
const renderApp = (Component) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    rootEl
  )
};

renderApp(App)

if (module.hot) {
  module.hot.accept('../shared/containers/App.js', () => {
    const nextApp = require('../shared/containers/App.js').default;
    renderApp(nextApp);
  });
}