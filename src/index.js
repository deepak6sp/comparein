import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-promise';
import Router from './routes/router.js';
import MainReducer from './reducers';

import '../assets/main.scss';

const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk)(createStore));
const store = createStoreWithMiddleware(MainReducer);


ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
  document.getElementById('main')
);

/**
 * This is required for webpack hot reloading
 */
if (module.hot) {
    module.hot.accept();
}
