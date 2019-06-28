import React from 'react';
import { render } from 'react-dom';
import App, { store } from './components/App';
import './index.scss';
import { fetchAuthenticated } from './actions/account';

store.dispatch(fetchAuthenticated()).then(() => {
    render(<App />, document.getElementById('app'));
});
