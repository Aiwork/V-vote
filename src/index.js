import React from 'react';
import {render} from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './Store/store'
import App from "./containers/App";


render(
  <Provider store={store}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
