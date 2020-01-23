import * as types from "../actions/stations";

const initialState = {
    stationsLoading: false,
    stationsError: null,
    stationsList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Get stations
        case types.GET_STATIONS_REQUESTED:
            return {
                ...state,
                stationsLoading: true
            };
        case types.GET_STATIONS_SUCCESS:
            return {
                ...state,
                stationsLoading: false,
                stationsList: [...state.stationsList, action.data]
            };
        case types.GET_STATIONS_FAILURE:
            return {
                ...state,
                stationsLoading: false,
                stationsError: action.data
            };
        default :
            return state;
    }
}