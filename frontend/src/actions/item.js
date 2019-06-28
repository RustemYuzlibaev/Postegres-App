import { ITEM } from './types';
import { BACKEND } from '../config';

export const fetchItem = () => dispatch => {
    dispatch({ type: ITEM.FETCH });

    return fetch(`${BACKEND.ADDRESS}/item/new`, {
        credentials: 'include',
    })
        .then(res => res.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({ type: ITEM.FETCH_ERROR, message: json.message });
            } else {
                dispatch({ type: ITEM.FETCH_SUCCESS, item: json.item });
            }
        })
        .catch(err =>
            dispatch({ type: ITEM.FETCH_ERROR, message: err.message }),
        );
};
