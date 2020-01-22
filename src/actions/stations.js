import API from "../utils/API";

export const GET_STATIONS_REQUESTED = 'GET_STATIONS_REQUESTED';
export const GET_STATIONS_SUCCESS = 'GET_STATIONS_SUCCESS';
export const GET_STATIONS_FAILURE = 'GET_STATIONS_FAILURE';

export function getStations(line) {
    return dispatch => {
        dispatch({type: GET_STATIONS_REQUESTED});
        const request = API.get('/stations/metros/' + line + '?way=A');
        request
            .then(response => dispatch({type: GET_STATIONS_SUCCESS, data: {line, 'stations': response.data.result.stations}}))
            .catch(error => dispatch({type: GET_STATIONS_FAILURE, data: error.response.data.result}))
        ;
        return request;
    };
}
