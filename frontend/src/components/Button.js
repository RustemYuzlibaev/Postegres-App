import React from 'react';

function Button({ onClick, text }) {
    return (
        <div>
            <button className="btn" onClick={onClick}>
                {text}
            </button>
        </div>
    );
}

export default Button;
