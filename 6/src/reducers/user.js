import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SET_CURRENT_USER
} from '../constants/User'

const initialState = {
    email: '',
    isAuthenticated: false
}

export default function userstate(state = initialState, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            return {...state}

        case LOGIN_SUCCESS:
            return {...state, email: action.payload.email, isAuthenticated: action.payload.isAuthenticated}

        case LOGIN_FAIL:
            return {...state}

        case LOGOUT_SUCCESS:
            return {...state, email: '', isAuthenticated: false}

        case SET_CURRENT_USER:
            return {...state, email: action.payload.email, isAuthenticated: action.payload.isAuthenticated}
    
        default:
            return state;
    }
}