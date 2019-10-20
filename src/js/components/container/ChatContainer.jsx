import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/container/ChatContainer.scss';

import Message from '../element/Message.jsx';

class ChatContainer extends Component {
    constructor() {
        super();

        this.state = {
            recepient: 'guy'
        };
    }

    render() {
        return(
            <>
                <div className='header'>
                    <i className="fas fa-at fa-fw"></i><span className='nick'>{ this.state.recepient }</span>
                </div>
                <div className='chat-container'>
                    <Message nick='KuriGohan'>testing</Message>
                    <Message nick='KuriGohan'>testing 1 2 3</Message>
                </div>
                <div className='textbox'>
                    <div>
                        <textarea placeholder={ 'Message @' + this.state.recepient } rows={1} />
                    </div>
                </div>
            </>
        );
    }
}

export default ChatContainer;
