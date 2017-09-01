import data from '../app_data/films';
import * as ActionsType from '../constants/Fetch'
import moment from 'moment';

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

        data.forEach(function(item) {
            item.rate = calcRating(item.id) || 0;
        });

        dispatch({
            type: ActionsType.GET_FILMS_SUCCESS,
            payload: {
                films: data
            }
        });
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
        film.rate = calcRating(film.id);

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

        comment.dataTime = moment(new Date()).format('MMM Do YYYY hh:mm');
        
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