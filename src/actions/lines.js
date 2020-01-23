import API from "../utils/API";
import APILocal from "../utils/APILocal";

export const GET_LINES_REQUESTED = 'GET_LINES_REQUESTED';
export const GET_LINES_SUCCESS = 'GET_LINES_SUCCESS';
export const GET_LINES_FAILURE = 'GET_LINES_FAILURE';

export function getLines() {
    return dispatch => {
        dispatch({type: GET_LINES_REQUESTED});
        const request = API.get('/lines');
        request
            .then(response => dispatch({type: GET_LINES_SUCCESS, data: response.data.result}))
            // .catch(error => dispatch({type: GET_LINES_FAILURE, data: error.response.data.result}))
            .catch(error => console.log(error))
        ;
        return request;
    };
}

export const GET_FAVORITE_LINES_REQUESTED = 'GET_FAVORITE_LINES_REQUESTED';
export const GET_FAVORITE_LINES_SUCCESS = 'GET_FAVORITE_LINES_SUCCESS';
export const GET_FAVORITE_LINES_FAILURE = 'GET_FAVORITE_LINES_FAILURE';

export function getFavoritesLines() {
    return dispatch => {
        dispatch({type: GET_FAVORITE_LINES_REQUESTED});
        const request = APILocal.get('/favorites');
        request
            .then(response => dispatch({type: GET_FAVORITE_LINES_SUCCESS, data: response.data}))
            .catch(error => dispatch({type: GET_FAVORITE_LINES_FAILURE, data: error.error}))
        ;
        return request;
    };
}

export const PUT_FAVORITE_LINES_REQUESTED = 'PUT_FAVORITE_LINES_REQUESTED';
export const PUT_FAVORITE_LINES_SUCCESS = 'PUT_FAVORITE_LINES_SUCCESS';
export const PUT_FAVORITE_LINES_FAILURE = 'PUT_FAVORITE_LINES_FAILURE';

export function putFavoritesLines(data) {
    return dispatch => {
        dispatch({type: PUT_FAVORITE_LINES_REQUESTED});
        const request = APILocal.put('/favorites', {favorites: data});
        request
            .then(() => dispatch({type: PUT_FAVORITE_LINES_SUCCESS, data}))
            .catch(error => dispatch({type: PUT_FAVORITE_LINES_FAILURE, data: error.error}))
        ;
        return request;
    };
}
