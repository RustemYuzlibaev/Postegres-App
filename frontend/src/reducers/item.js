import { ITEM } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ITEM = {
    itemId: '',
    name: '',
    date: '',
    characteristics: [],
};

const item = (state = DEFAULT_ITEM, action) => {
    switch (action.type) {
        case ITEM.FETCH:
            return { ...state, status: fetchStates.fetching };

        case ITEM.FETCH_ERROR:
            console.log(action.message);
            return {
                ...state,
                status: fetchStates.error,
                message: action.message,
            };

        case ITEM.FETCH_SUCCESS:
            console.log({ ...action.item });

            return { ...state, status: fetchStates.success, ...action.item };
        default:
            return state;
    }
};

export default item;
