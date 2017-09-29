import * as ActionsType from '../constants/Fetch';
import $ from 'jQuery';

export function getFilms() {
   
    return (dispatch) => {
        dispatch({
            type: ActionsType.GET_FILMS_REQUEST
        });

        var films;
        $.ajax({
            url: '/Film/Index',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(response) {
            films = response;
            dispatch({
                type: ActionsType.GET_FILMS_SUCCESS,
                payload: {
                    films: films
                }
            });
        })
        .fail(function(response) {
                console.log(response);
            dispatch({
                type: ActionsType.GET_FILMS_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        });
    }
}

export function getFilmComments(filmId) {
    return (dispatch) =>{
        let filmComments = [];
        $.ajax({
            url: '/Comment/GetFilmComments?filmId=' + filmId,
            type: 'GET'
        })
        .done(function(response) {
            filmComments = response;
            dispatch({
                type: ActionsType.GET_FILM_SUCCESS,
                payload: {
                    comments: filmComments
                }
            });
        })
        .fail(function() {
            dispatch({
                type: ActionsType.GET_FILM_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        });
    }
}

export function getFilm(name) {
    return(dispatch) => {
        let film;
        $.ajax({
            url: '/Film/GetByName?name=' + name,
            type: 'GET'
        })
        .done(function(response) {
            film = response;
            dispatch({
                type: ActionsType.GET_FILM_SUCCESS,
                payload: {
                    film: film
                }
            });
        })
        .fail(function() {
            dispatch({
                type: ActionsType.GET_FILM_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        });
    }
}

export function createComment(comment) {
    return (dispatch) => {
        let newComment;
        $.ajax({
            url: '/Comment/Create',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(comment)
        })
        .done(function(response) {
            newComment = response;
            dispatch({
                type: ActionsType.CREATE_COMMENT_SUCCESS,
                payload: {
                    comment: newComment
                }
            });
        })
        .fail(function(response) {
            console.log(response);
            dispatch({
                type: ActionsType.CREATE_COMMENT_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        });

    }
}

export function changeRating(rating) {
    return (dispatch) => {
        let newRating;
        $.ajax({
            url: '/Rating/ChangeRating',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rating)
        })
        .done(function(response) {
            newRating = response;
            dispatch({
                type: ActionsType.CHANGE_RATING,
                payload: {
                    rating: newRating
                }
            });
        })
        .fail(function(response) {
            console.log(response);
        });
    }
}