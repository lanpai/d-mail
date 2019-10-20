import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/element/Message.scss';

class Message extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className='message'>
                <span className='nick'>{ this.props.nick }</span><br />
                { this.props.children }
            </div>
        );
    }
}

export default Message;
