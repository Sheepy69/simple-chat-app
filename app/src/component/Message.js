import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../css/messages.css'

export class Message extends Component {
    render() {
        return (
            <div className={'message'}>
                <p><span className={'nickname'} color={this.props.color}>{this.props.user}></span><span>{this.props.content}</span><span>[{this.props.date}]</span></p>
            </div>
        )
    }


}

Message.propTypes = {
    user: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};


