import APILocal from "../utils/APILocal";

export const LOGOUT_REQUESTED = "LOGOUT_REQUESTED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function logOut() {
    return dispatch => {
        dispatch({type: LOGOUT_REQUESTED});
        dispatch({type: LOGOUT_SUCCESS});
        localStorage.removeItem("token");
    }
}

export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export function logIn(data) {
    return dispatch => {
        dispatch({type: LOGIN_REQUESTED});
        const request = APILocal.post('/api/login', data);
        request
            .then(response => {
                localStorage.setItem("token", response.data.token);
                dispatch({type: LOGIN_SUCCESS, data: response.data.token});
            })
            .catch(error => dispatch({type: LOGIN_FAIL, data: error}))
        ;
        return request;
    };
}

export const SIGN_IN_REQUESTED = "SIGN_IN_REQUESTED";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";

export function signIn(data) {
    return dispatch => {
        dispatch({type: SIGN_IN_REQUESTED});
        const request = APILocal.put('/api/register', data);
        request
            .then(response => {
                localStorage.setItem("token", response.data.token);
                dispatch({type: SIGN_IN_SUCCESS, data: response.data.token})
            })
            .catch(error => dispatch({type: SIGN_IN_FAIL, data: error}))
        ;
        return request;
    };
}
