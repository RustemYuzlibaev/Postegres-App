import generation from './generation';
import item from './item';
import account from './account';
import accountItems from './accountItems';
import accountInfo from './accountInfo';
import publicItems from './publicItems';

import { combineReducers } from 'redux';

export default combineReducers({
    generation,
    item,
    account,
    accountItems,
    accountInfo,
    publicItems,
});
