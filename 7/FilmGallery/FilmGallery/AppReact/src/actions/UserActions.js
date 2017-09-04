/* eslint-disable no-unused-vars */

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SET_CURRENT_USER
} from '../constants/User'

import {
    ROUTING
} from '../constants/Routing'

import $ from 'jQuery';

export function logout() {
    return (dispatch) => {

        $.ajax({
            url: '/Account/LogOff'
        })
        .done(function(response) {
            console.log(response);
            
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: {
                    email: '',
                    isAuthenticated: false
                }
            });
        })
        .fail(function(response) {
            console.log(response);
        });
    }
}

export function getCurrentUser() {
    return (dispatch) => {

        var currentUser;

        $.ajax({
            url: '/Account/GetCurrentUserName',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(response) {
            currentUser = response;
            
            dispatch({
                type: SET_CURRENT_USER,
                payload: {
                    email: currentUser,
                    isAuthenticated: true
                }
            });
        })
        .fail(function(response) {
            console.log(response);
        });

    }
}

export function routing() {
    return (dispatch) => {
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