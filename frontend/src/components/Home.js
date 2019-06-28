import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Generation from './Generation';
import AccountInfo from './AccountInfo';
import { Link } from 'react-router-dom';
import Item from './Item';
import Button from './Button';
import { logout } from '../actions/account';

export class Home extends Component {
    render() {
        return (
            <Fragment>
                <Button text="Log out" onClick={this.props.logout} />
                <h2>Item Stack from React</h2>
                <Generation />
                <Item />
                <hr />
                <AccountInfo />
                <hr />
                <Link to="/account-items">Account Items</Link>
                <br />
                <Link to="/public-items">Public Items</Link>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout },
)(Home);
