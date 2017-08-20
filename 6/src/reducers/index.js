import { combineReducers } from 'redux';
import user from './user';
import fetch from './fetch';
import auth from './auth';

export const rootReducer = combineReducers({
    user,
    fetch,
    auth
});