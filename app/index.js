import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import Home from './containers/HomePage';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(<Home />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/HomePage', () => {
    const NextRoot = require('./containers/HomePage'); // eslint-disable-line global-require
    render(<NextRoot />, document.getElementById('root'));
  });
}
