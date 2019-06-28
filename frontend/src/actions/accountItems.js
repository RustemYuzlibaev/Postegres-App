import { fetchFromAccount } from './account';
import { ACCOUNT_ITEMS } from './types';

export const fetchAccountItems = () =>
    fetchFromAccount({
        endpoint: 'items',
        options: { credentials: 'include' },
        FETCH_TYPE: ACCOUNT_ITEMS.FETCH,
        ERROR_TYPE: ACCOUNT_ITEMS.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT_ITEMS.FETCH_SUCCESS,
    });
