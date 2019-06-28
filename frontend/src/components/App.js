import React, { Component, Fragment } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import Root from '../components/Root';
import AccountItems from './AccountItems';
import PublicItems from './PublicItems';

const composeEnhancers = composeWithDevTools({
    trace: false,
});
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

// Hihger-order stateless component
const AuthRoute = props => {
    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />;
    }

    const { component, path } = props;

    return <Route path={path} component={component} />;
};

export class App extends Component {
    render() {
        console.dir(store.getState());
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Root} />
                        <AuthRoute
                            path="/account-items"
                            component={AccountItems}
                        />
                        <AuthRoute
                            path="/public-items"
                            component={PublicItems}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
