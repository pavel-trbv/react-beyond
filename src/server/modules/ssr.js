import React from 'react';
import {renderToString} from 'react-dom/server';

import createStore from '../../shared/store/createStore';
import createHistory from 'history/createMemoryHistory'

import Html from './Html';

const renderApp = (res, url, store) => {
  const context = {};

  const html = renderToString(
    <Html
      title='React Beyond - counter example'
      url={url}
      context={context} 
      store={store} /> 
  );

  res.send('<!DOCTYPE html>'+html);
}

export const renderPage = (req, res) => {
  const history = createHistory();
  const store = createStore(history);

  renderApp(res, req.url, store);
} 
