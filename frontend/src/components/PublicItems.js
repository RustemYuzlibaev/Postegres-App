import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicItems } from '../actions/publicItems';
import { Link } from 'react-router-dom';
import PublicItemRow from './PublicItemRow';
import { BACKEND } from '../config';
import Button from './Button';

class PublicItems extends Component {
    componentDidMount() {
        this.props.fetchPublicItems();
    }

    onLog = () => {
        fetch(`${BACKEND.ADDRESS}/item/public-items-to-console`)
            .then(res => res.json())
            .then(json => {
                console.table(json);
            })
            .catch(e => console.error(e));
    };

    render() {
        return (
            <div>
                <h3>Public Items</h3>
                {this.props.publicItems.items.map(item => {
                    return (
                        <div key={item.itemId}>
                            <PublicItemRow item={item} />
                            <br />
                        </div>
                    );
                })}
                <Button text="Log to the console" onClick={this.onLog} />
                <Link to="/">Home</Link>
            </div>
        );
    }
}

export default connect(
    ({ publicItems }) => ({ publicItems }),
    { fetchPublicItems },
)(PublicItems);
