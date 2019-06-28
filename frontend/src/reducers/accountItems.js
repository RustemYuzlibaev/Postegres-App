import { ACCOUNT_ITEMS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_ITEMS = { items: [] };

const accountItems = (state = DEFAULT_ACCOUNT_ITEMS, action) => {
    switch (action.type) {
        case ACCOUNT_ITEMS.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_ITEMS.FETCH_ERROR:
            return {
                ...state,
                status: fetchStates.error,
                message: action.message,
            };
        case ACCOUNT_ITEMS.FETCH_SUCCESS:
            return {
                ...state,
                status: fetchStates.success,
                items: action.items,
            };
        default:
            return state;
    }
};

export default accountItems;
