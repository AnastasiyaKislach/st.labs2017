/* eslint-disable no-unused-vars */

import {
    LOGOUT_SUCCESS
    } from '../constants/User'

import {
    SET_CURRENT_USER
    } from '../constants/Authenticate'

import {
    ROUTING
    } from '../constants/Routing'

export function logout() {
    return (dispatch) => {

        localStorage.removeItem('currentUser');
        
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: {
            }
        });

        dispatch({
            type: ROUTING,
            payload: {
                method: 'replace',
                nextUrl: '/login'
            }
        });
        
    }
}

export function setCurrentUser() {
    return (dispatch) => {

        var currentUser = localStorage.getItem('currentUser');

        if (currentUser) {

            var user = JSON.parse(currentUser);
            
            dispatch({
                type: SET_CURRENT_USER,
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
        }
    }
}