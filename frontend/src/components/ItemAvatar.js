import React, { Component } from 'react';

export class ItemAvatar extends Component {
    render() {
        const { itemId, characteristics } = this.props.item;

        if (!itemId) return <div />;

        return (
            <div>
                <span>ID:{itemId} </span>

                {characteristics.map(char => char.charValue).join(', ')}
            </div>
        );
    }
}

export default ItemAvatar;
