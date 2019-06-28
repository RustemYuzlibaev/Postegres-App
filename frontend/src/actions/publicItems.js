import { fetchFromAccount } from './account';
import { PUBLIC_ITEMS } from './types';
import { BACKEND } from '../config';

export const fetchPublicItems = () => dispatch => {
    dispatch({ type: PUBLIC_ITEMS.FETCH });

    return fetch(`${BACKEND.ADDRESS}/item/public-items`)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: PUBLIC_ITEMS.FETCH_ERROR,
                    message: json.message,
                });
            } else {
                dispatch({
                    type: PUBLIC_ITEMS.FETCH_SUCCESS,
                    items: json.items,
                });
            }
        })
        .catch(error =>
            dispatch({
                type: PUBLIC_ITEMS.FETCH_ERROR,
                message: error.message,
            }),
        );
};
