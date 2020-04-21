import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './redux/index';
import App from './App';

const middlewares = [reduxThunk];

const store = createStore(
  reducers,
  {},
  applyMiddleware(...middlewares),
);

// Using browserRouter to keep the URLs simple and not with #
// This component will keep track of our URLs.
// Whenever URL changes the changes will reflect in the app
// component
/* eslint-disable  */
const router = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
