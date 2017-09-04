import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { routes } from './routes'
import {Provider} from 'react-redux'
import configureStore from './store/cofigureStore'
import { saveState} from './store/localStorage';

const store = configureStore();

store.subscribe(() => {
    saveState(store.getState());
});

render(
    <Provider store={store}>
        <Router history={browserHistory} routes = {routes}/> 
    </Provider>,
    document.getElementById('root') 
)