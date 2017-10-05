import React, { Component } from 'react'
import {StaticRouter} from 'react-router';
import {renderToString} from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'

import App from '../../shared/containers/App'

class Html extends Component {
  render() {

    const PROD = process.env.NODE_ENV === 'production';

    const {
      title,
      url,
      context,
      store
    } = this.props;

    let state = store.getState();

    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;

    const sheet = new ServerStyleSheet();

    const markup = PROD && renderToString(
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <StaticRouter location={url} context={context}>
            <App />  
          </StaticRouter>
        </StyleSheetManager>
      </Provider>
    );

    const styleTags = sheet.getStyleElement();

    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{title}</title>

          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>

          {PROD && <link rel="stylesheet" href="/static/bundle.css" type="text/css" />}
          {PROD && <script src="/static/vendor.js" />}
          <script src="/static/bundle.js" defer></script>
          {PROD && styleTags}
        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: initialState}} />
          {PROD ? <div id="root" dangerouslySetInnerHTML={{__html: markup}}></div> : <div id="root">Processing...</div>}
        </body>
      </html>
    );
  }
}

export default Html;