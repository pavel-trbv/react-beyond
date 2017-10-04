import React, { Component } from 'react';
import Router from 'components/Router'
import Home from 'components/Home';
import routes from 'routes';

class App extends Component {
  state = {  }
  render() {
    return (
      <div>
        <Router routes={routes} />
      </div>
    );
  }
}

export default App;