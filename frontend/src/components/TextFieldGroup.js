import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TextFieldGroup extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        type: 'text',
    };

    render() {
        const { type, name, placeholder, value, onChange } = this.props;

        return (
            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default TextFieldGroup;
