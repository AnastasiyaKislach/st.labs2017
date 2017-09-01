import { combineReducers } from 'redux';
import user from './user';
import fetch from './fetch';

export const rootReducer = combineReducers({
    user,
    fetch
});