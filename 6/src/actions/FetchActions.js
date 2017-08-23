import data from '../app_data/films';
import * as ActionsType from '../constants/Fetch'


export function getFilms() {
   
    return (dispatch) => {
        dispatch({
            type: ActionsType.GET_FILMS_REQUEST
        });
       
        if (!data) {
            dispatch({
                type: ActionsType.GET_FILMS_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        }
        dispatch({
            type: ActionsType.GET_FILMS_SUCCESS,
            payload: {
                films: data
            }
        });
    }
}

function getFilmComments(filmId) {

    let comments = JSON.parse(localStorage.getItem('comments'));

    let filmComments = [];

    if (comments && comments.length) {
        for (let i = 0; i < comments.length; i++ ) {
            if (comments[i].filmId == filmId) {
                filmComments = filmComments.concat(comments[i]);
            }
        }
    }
    return filmComments;
}

export function getFilm(name) {
    return(dispatch) => {
        
        let film = data.find(function(item) {
            if (item.name.toLowerCase() === name.toLowerCase()) {
                return item;
            }
            return undefined;
        });

        film.comments = getFilmComments(film.id);
       
        dispatch({
            type: ActionsType.GET_FILM_SUCCESS,
            payload: {
                film: film
            }
        });
    }
}

export function createComment(comment) {
    return (dispatch) => {

        let comments = JSON.parse(localStorage.getItem('comments')) || [];
      
        comments = comments.concat(comment);

        localStorage.setItem('comments', JSON.stringify(comments));
            
        dispatch({
            type: ActionsType.CREATE_COMMENT_SUCCESS,
            payload: {
                comment: comment
            }
        });
      
    }
}