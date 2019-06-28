import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

export class AuthForm extends Component {
    state = {
        username: '',
        password: '',
        buttonClicked: false,
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signup = e => {
        e.preventDefault();
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.signup({ username, password });
    };

    login = e => {
        e.preventDefault();
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.login({ username, password });
    };

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.account.status === fetchStates.error
        ) {
            return <div>{this.props.account.message}</div>;
        }
    }

    render() {
        return (
            <div>
                <h2>Authentication process</h2>
                <form>
                     <TextFieldGroup
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={this.login} text="Log In" />
                        <span>or</span>
                        <Button onClick={this.signup} text="Sign Up" />
                    </div>
                    <br />
                    {this.Error}
                </form>
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }),
    { signup, login },
)(AuthForm);
