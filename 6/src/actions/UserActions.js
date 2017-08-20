/* eslint-disable no-unused-vars */

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/User'

import {
    ROUTING
    } from '../constants/Routing'

export function login(payload) {
    return (dispatch) => {

        if (!payload.email && !payload.password) {
            dispatch({
                type: LOGIN_FAIL
            });
            return;
        }

        dispatch({
            type: LOGIN_REQUEST
        });

        var user = {
            email:  payload.email,
            password: payload.password
        };

       

        var value = window.localStorage.getItem(user.email);
        if (!value) {
            window.localStorage.setItem(user.email, user.password);
        }else if (value !== user.password) {
            dispatch({
                type: LOGIN_FAIL
            });
        }

        window.localStorage.setItem('currentUser', JSON.stringify(user));
        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    email: user.email,
                    isAuthenticated: true
                }
            });

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'replace',
                    nextUrl: '/'
                }
            });
        },
            2000);
    }
}


export function logout() {
    (dispatch) => {

        dispatch({
            type: LOGOUT_SUCCESS
        });

        localStorage.removeItem('currentUser');
        
        dispatch({
            type: ROUTING,
            payload: {
                method: 'replace',
                nextUrl: '/login'
            }
        });
        
    }
}

/* eslint-enable no-unused-vars */