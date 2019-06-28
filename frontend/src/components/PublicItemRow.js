import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ItemAvatar from './ItemAvatar';
import { BACKEND } from '../config';
import Button from './Button';

class PublicItemRow extends Component {
    buy = () => {
        const { itemId, saleValue } = this.props.item;

        fetch(`${BACKEND.ADDRESS}/item/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId, saleValue }),
        })
            .then(res => res.json())
            .then(json => {
                alert(json.message);

                if (json.type !== 'error') {
                    this.props.history.push('/account-items');
                }
            })
            .catch(err => alert(err.message));
    };

    render() {
        return (
            <div>
                <div>{this.props.item.name}</div>
                <ItemAvatar item={this.props.item} />
                <div>Sale Value: {this.props.item.saleValue}</div>
                <br />
                <Button text="Buy" onClick={this.buy} />
            </div>
        );
    }
}

export default withRouter(PublicItemRow);
