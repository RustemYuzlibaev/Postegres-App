import { ACCOUNT } from './types';
import { BACKEND } from '../config';

export const fetchFromAccount = ({
    endpoint,
    options,
    FETCH_TYPE,
    ERROR_TYPE,
    SUCCESS_TYPE,
}) => dispatch => {
    dispatch({ type: FETCH_TYPE });

    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
        .then(res => res.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({ type: ERROR_TYPE, message: json.message });
            } else {
                console.log('JSON to dispatch', { ...json });

                dispatch({ type: SUCCESS_TYPE, ...json });
            }
        })
        .catch(err => {
            dispatch({ type: ERROR_TYPE, message: err.message });
        });
};

export const signup = ({ username, password }) =>
    fetchFromAccount({
        endpoint: 'signup',
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: 'include',
        },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
    });

export const login = ({ username, password }) =>
    fetchFromAccount({
        endpoint: 'login',
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: 'include',
        },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
    });

export const logout = () =>
    fetchFromAccount({
        endpoint: 'logout',
        options: { credentials: 'include' },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
    });

export const fetchAuthenticated = () =>
    fetchFromAccount({
        endpoint: 'authenticated',
        options: { credentials: 'include' },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
    });
