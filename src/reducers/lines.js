import * as types from "../actions/lines";

const initialState = {
    linesLoading: false,
    linesError: null,
    linesList: {},
    getFavoriteLinesLoading: false,
    getFavoriteLinesError: null,
    putFavoriteLinesLoading: false,
    putFavoriteLinesError: null,
    favoriteLines: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Get lines
        case types.GET_LINES_REQUESTED:
            return {
                ...state,
                linesLoading: true
            };
        case types.GET_LINES_SUCCESS:
            return {
                ...state,
                linesLoading: false,
                linesList: action.data
            };
        case types.GET_LINES_FAILURE:
            return {
                ...state,
                linesLoading: false,
                linesError: action.data
            };
        // Get favorite lines
        case types.GET_FAVORITE_LINES_REQUESTED:
            return {
                ...state,
                getFavoriteLinesLoading: true
            };
        case types.GET_FAVORITE_LINES_SUCCESS:
            return {
                ...state,
                getFavoriteLinesLoading: false,
                favoriteLines: action.data === "" || !action.data
                    ? {
                        metros: [],
                        rers: [],
                        tramways: [],
                        noctiliens: [],
                        buses: []
                    }
                    : action.data
            };
        case types.GET_FAVORITE_LINES_FAILURE:
            return {
                ...state,
                getFavoriteLinesLoading: false,
                getFavoriteLinesError: action.data
            };
        // Put favorite lines
        case types.PUT_FAVORITE_LINES_REQUESTED:
            return {
                ...state,
                putFavoriteLinesLoading: true
            };
        case types.PUT_FAVORITE_LINES_SUCCESS:
            return {
                ...state,
                putFavoriteLinesLoading: false,
                favoriteLines: action.data
            };
        case types.PUT_FAVORITE_LINES_FAILURE:
            return {
                ...state,
                putFavoriteLinesLoading: false,
                putFavoriteLinesError: action.data
            };
        default :
            return state;
    }
}
