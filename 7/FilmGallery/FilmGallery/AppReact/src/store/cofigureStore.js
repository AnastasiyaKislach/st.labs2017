import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { rootReducer } from '../reducers';
import { redirect } from '../middlewares/redirect';

import {loadStore} from './localStorage';

const persistedState = loadStore();

export default function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(createLogger()),
        applyMiddleware(redirect)
    )(createStore)(rootReducer, persistedState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}