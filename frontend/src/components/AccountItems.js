import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchAccountItems } from '../actions/accountItems';
import AccountItemRow from './AccountItemRow';
import { BACKEND } from '../config';
import axios from 'axios';
import { connect } from 'react-redux';

class AccountItems extends Component {
    state = {
        items: this.props.accountItems,
    };

    componentDidMount() {
        console.log('this.props.accountItems', this.props.accountItems);

        this.props.fetchAccountItems();
    }

    render() {
        if (this.state.items.items !== undefined) {
            const itemsToRender = this.state.items.items.map(item => (
                <div key={item.itemId}>
                    <AccountItemRow item={item} />
                </div>
            ));

            return (
                <div>
                    {itemsToRender}
                    <br />
                    <Link to="/">Home</Link>
                </div>
            );
        }

        return <div />;
    }
}

export default connect(
    ({ accountItems }) => ({ accountItems }),
    { fetchAccountItems },
)(AccountItems);
