import React, { Component } from 'react';

import css from '../../../css/container/ChatContainer.scss';

import Message from '../element/Message.jsx';
import TextBox from '../element/TextBox.jsx';

class ChatContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <>
                <div className='header'>
                    <i className="fas fa-at fa-fw"></i><span className='nick'>{ this.props.recepient }</span>
                </div>
                <div className='chat-container'>
                    <Message nick='KuriGohan'>testing</Message>
                    <Message nick='KuriGohan'>testing 1 2 3</Message>
                </div>
                <TextBox placeholder={ 'Message @' + this.props.recepient } />
            </>
        );
    }
}

export default ChatContainer;
