import {
    GET_FILMS_REQUEST,
    GET_FILMS_SUCCESS,
    GET_FILMS_ERROR,
    GET_FILM_REQUEST,
    GET_FILM_SUCCESS,
    GET_FILM_ERROR,
    CREATE_COMMENT_SUCCESS,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    CHANGE_RATING
} from '../constants/Fetch'

const initialState = {
    films: [],
    film: {}, 
    comments: []
}

export default function appActions(state = initialState, action) {

    switch (action.type) {

        case GET_FILMS_REQUEST:
            return {...state}

        case GET_FILMS_SUCCESS: {
                return { ...state, films: action.payload.films }
        }
        case GET_FILMS_ERROR: 
            return {...state}

        case GET_FILM_REQUEST:
            return {...state}

        case GET_FILM_SUCCESS: 
            return { ...state, film: action.payload.film}

        case GET_FILM_ERROR: 
            return {...state}

        case CREATE_COMMENT_SUCCESS:{
            let film = state.film;
            film.Comments = [...film.Comments, action.payload.comment];
            state.film = { ...state.film };
            return {...state}
        }
        
        case GET_COMMENTS_REQUEST:
            return {...state}

        case GET_COMMENTS_SUCCESS:
            return {...state, comments: action.payload.comments}

        case CHANGE_RATING:{
            var film = state.film;
            film.Rating = action.payload.rating;
            state.film = { ...state.film };
            return {...state} 
        }
            
        default:
            return state;
    }
}