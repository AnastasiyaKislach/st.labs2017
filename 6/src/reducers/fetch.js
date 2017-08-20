import * as FetchActions from '../constants/Fetch';

import data from '../app_data/films';

const initialState = {
    data: data
}

export default function appActions(state = initialState, action) {

    switch (action.type) {
    case FetchActions.AJAX_SUCCESS:
        return { ...state, data: action.payload.films}
    default:
        return state;
    }
}