import React, { Component } from 'react';
import ItemAvatar from './ItemAvatar';
import Button from './Button';
import { BACKEND } from '../config';

class AccountItemRow extends Component {
    state = {
        name: this.props.item.name,
        isPublic: this.props.item.isPublic,
        saleValue: this.props.item.saleValue,
        edit: false,
    };

    get SaveButton() {
        return <Button onClick={this.save} text="Save" />;
    }

    get EditButton() {
        return <Button onClick={this.toggleEdit} text="Edit" />;
    }

    toggleEdit = () => {
        this.setState({ edit: !this.state.edit });
    };

    updateName = event => {
        this.setState({ name: event.target.value });
    };

    updateSaleValue = event => {
        this.setState({ saleValue: event.target.value });
    };

    updateIsPublic = event => {
        this.setState({ isPublic: event.target.checked });
    };

    save = () => {
        fetch(`${BACKEND.ADDRESS}/item/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId: this.props.item.itemId,
                name: this.state.name,
                isPublic: this.state.isPublic,
                saleValue: this.state.saleValue,
            }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.type === 'error') {
                    alert(json.message);
                } else {
                    this.toggleEdit();
                }
            })
            .catch(err => alert(err.message));
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.updateName}
                    disabled={!this.state.edit}
                />
                <br />
                <ItemAvatar item={this.props.item} />
                <div>
                    <span>
                        Sale Value:{' '}
                        <input
                            type="number"
                            disabled={!this.state.edit}
                            value={this.state.saleValue}
                            onChange={this.updateSaleValue}
                        />
                    </span>{' '}
                    <span>
                        Public:{' '}
                        <input
                            type="checkbox"
                            disabled={!this.state.edit}
                            checked={this.state.isPublic}
                            onChange={this.updateIsPublic}
                        />
                    </span>
                    {this.state.edit ? this.SaveButton : this.EditButton}
                </div>
            </div>
        );
    }
}

export default AccountItemRow;
