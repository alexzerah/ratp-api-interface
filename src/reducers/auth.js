import Base64 from 'base-64';
import * as types from "../actions/auth";

export function parseJwt(token){
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(Base64.decode(base64));
    } catch (error) {
        return null;
    }
}

const initialState = {
    user: null,
    logInLoading: false,
    logInError: null,
    logOutLoading: false,
    signInLoading: false,
    signInError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGOUT_REQUESTED:
            return {
                ...state,
                logOutLoading: true
            };
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                user: null
            };
        case types.LOGIN_REQUESTED:
            return {
                ...state,
                logInLoading: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                logInLoading: false,
                user: parseJwt(action.data)
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                logInLoading: false,
                logInError: action.data,
                user: null
            };
        case types.SIGN_IN_REQUESTED:
            return {
                ...state,
                signInLoading: true
            };
        case types.SIGN_IN_SUCCESS:
            return {
                ...state,
                signInLoading: false,
                user: parseJwt(action.data)
            };
        case types.SIGN_IN_FAIL:
            return {
                ...state,
                signInLoading: false,
                signInError: action.data,
                user: null
            };
        default :
            return state;
    }
}
