//import data from '../app_data/films';
import * as ActionsType from '../constants/Fetch'
//import moment from 'moment';
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
        .fail(function() {
            dispatch({
                type: ActionsType.GET_FILMS_ERROR,
                payload: {},
                errors: 'Нет данных'
            });
        });

        //if (!films) {
        //    dispatch({
        //        type: ActionsType.GET_FILMS_ERROR,
        //        payload: {},
        //        errors: 'Нет данных'
        //    });
        //    return;
        //}

        //films.forEach(function(item) {
        //    item.rate = calcRating(item.id) || 0;
        //});

      
    }
}

function calcRating(filmId) {
    let rates = JSON.parse(localStorage.getItem('rating')) || [];
    let rate = 0, count = 0;
    if (rates && rates.length) {
        for (let i = 0 ; i < rates.length; i++) {
            if (rates[i].filmId == filmId) {
                rate += rates[i].rate;
                count += 1;
            }
        }
        rate = Math.round(rate/count);
    }
    return rate;
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


        //let film = data.find(function(item) {
        //    if (item.name.toLowerCase() === name.toLowerCase()) {
        //        return item;
        //    }
        //    return undefined;
        //});

        //film.comments = getFilmComments(film.id);
        //film.rate = calcRating(film.id);

        //dispatch({
        //    type: ActionsType.GET_FILM_SUCCESS,
        //    payload: {
        //        film: film
        //    }
        //});
    }
}

//export function createComment(comment) {
//    return (dispatch) => {

//        let comments = JSON.parse(localStorage.getItem('comments')) || [];

//        comment.dataTime = moment(new Date()).format('MMM Do YYYY hh:mm');
        
//        comments = comments.concat(comment);

//        localStorage.setItem('comments', JSON.stringify(comments));
            
//        dispatch({
//            type: ActionsType.CREATE_COMMENT_SUCCESS,
//            payload: {
//                comment: comment
//            }
//        });
      
//    }
//}

export function createComment(comment) {
    return (dispatch) => {
        let newComment = $.param(comment);
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


export function changeRating(rate) {
    return (dispatch) => {
        let rates = JSON.parse(localStorage.getItem('rating')) || [],
            rateFilm = null;
       
        if (rates && rates.length) {
            rateFilm = rates.find(function(item) {
                if (item.filmId == rate.filmId && item.user === rate.user) {
                    item.rate = rate.rate;
                    return item;
                }
            });
        }
        if (!rateFilm) {
            rates.push({
                user: rate.user,
                filmId: rate.filmId,
                rate: rate.rate
            });
        }

        let newRate = calcRating(rate.filmId);

        localStorage.setItem('rating', JSON.stringify(rates));

        dispatch({
            type: ActionsType.CHANGE_RATING,
            payload: {
                rating: newRate
            }
        });
    }
}