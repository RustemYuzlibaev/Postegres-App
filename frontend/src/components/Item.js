import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../actions/item';
import ItemAvatar from './ItemAvatar';
import Button from './Button';

export class Item extends Component {
    render() {
        return (
            <div>
                <Button text="Add item" onClick={this.props.fetchItem} />
                <ItemAvatar item={this.props.item} />
            </div>
        );
    }
}

export default connect(
    ({ item }) => ({ item }),
    { fetchItem },
)(Item);
