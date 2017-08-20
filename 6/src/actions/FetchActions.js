import axios from 'axios';
import filePath from '../app_data/films.json';

import {
    AJAX_REQUEST,
    AJAX_ERROR,
    AJAX_SUCCESS
} from '../constants/Fetch'

export function ajaxRequestFunction() {
    var url = filePath;
    return (dispatch) => {
        dispatch({
            type: AJAX_REQUEST,
            payload: {}
        });
        
        axios.get(url)
            .then((payload) => {
                dispatch({
                    type: AJAX_SUCCESS,
                    payload: {
                        films: payload.data
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: AJAX_ERROR,
                    payload: {},
                    errors: error
                });
            });
       
    }
}