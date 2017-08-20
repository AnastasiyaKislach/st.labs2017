import { SET_CURRENT_USER } from '../constants/Authenticate';
import { LOGOUT_SUCCESS } from '../constants/User';
//import isEmpty from 'lodash/isEmpty';

const initialState = {};

export default function authState(state = initialState, action) {
    switch(action.type) {
        
        case SET_CURRENT_USER:
            return {...state, user: action.payload.email, isAuthenticated: action.payload.isAuthenticated}
        
        case LOGOUT_SUCCESS:   
            return {...state, action: action}
        
        default: return state;
    }
}