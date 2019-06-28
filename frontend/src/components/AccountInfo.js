import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfo';
import Button from './Button';
import { BACKEND } from '../config';

class AccountInfo extends Component {
    state = {
        currentUsername: this.props.accountInfo.username,
        nextUsername: this.props.accountInfo.username,
        edit: true,
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.accountInfo.username !== 'undefined') {
            return true;
        }
    }

    componentDidMount() {
        this.props.fetchAccountInfo();
        console.log(this.props.fetchAccountInfo());
    }

    onChange = e => {
        this.setState({ nextUsername: e.target.value });
    };

    toggleEdit = () => {
        this.setState({ edit: !this.state.edit });
    };

    onSave = () => {
        fetch(`${BACKEND.ADDRESS}/account/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUsername: this.props.accountInfo.username,
                nextUsername: this.state.nextUsername,
            }),
        })
            .then(res => res.json())
            .then(json => {
                this.toggleEdit();
                if (json.type === 'error') {
                    alert(json.message);
                }
            })
            .catch(err => alert(err));
        this.toggleEdit();
    };
    render() {
        return (
            <div>
                <h3>Account Info</h3>
                <input
                    value={this.state.nextUsername}
                    disabled={this.state.edit}
                    onChange={this.onChange}
                />
                <input type="checkbox" onChange={this.toggleEdit} />
                <Button text="Save" onClick={this.onSave} />
                <div>Balance: {this.props.accountInfo.balance}</div>
            </div>
        );
    }
}

export default connect(
    ({ accountInfo }) => ({ accountInfo }),
    { fetchAccountInfo },
)(AccountInfo);
