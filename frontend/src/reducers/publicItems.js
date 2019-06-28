import { PUBLIC_ITEMS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_PUBLIC_ITEMS = { items: [] };

const publicItems = (state = DEFAULT_PUBLIC_ITEMS, action) => {
    switch (action.type) {
        case PUBLIC_ITEMS.FETCH:
            return { ...state, status: fetchStates.fetching };

        case PUBLIC_ITEMS.FETCH_SUCCESS:
            return {
                ...state,
                status: fetchStates.success,
                items: action.items,
            };

        case PUBLIC_ITEMS.FETCH_ERROR:
            return {
                ...state,
                status: fetchStates.error,
                message: action.message,
            };

        default:
            return state;
    }
};

export default publicItems;
