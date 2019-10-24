import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/container/ChatContainer.scss';

import { sendMessage } from '../../../actions';

import Message from '../element/Message.jsx';
import TextBox from '../element/TextBox.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        conversation: state.history[ownProps.recepient] || []
    }
};

let chatContainer;
class ChatContainer extends Component {
    constructor() {
        super();

        chatContainer = this;
        this.chatContainer = React.createRef();
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();

            let message = this.value;
            if (message) {
                this.value = '';
                sendMessage(chatContainer.props.recepient, message);
            }
        }
    }

    render() {
        let conversation = this.props.conversation.map((message) =>
            <Message key={ message.id } nick={ message.author }>{ message.body }</Message>
        );

        if (this.chatContainer.current) {
            let scrollBottom = this.chatContainer.current.clientHeight + this.chatContainer.current.scrollTop;
            console.log(this.chatContainer.current.clientHeight, this.chatContainer.current.scrollTop);
            console.log(scrollBottom, this.chatContainer.current.scrollHeight);
            if (scrollBottom + 100 > this.chatContainer.current.scrollHeight)
                setTimeout(() => {
                    this.chatContainer.current.scrollTop = this.chatContainer.current.scrollHeight;
                }, 0);
        }
        return(
            <>
                <div className='header'>
                    <i className="fas fa-at fa-fw"></i><span className='nick'>{ this.props.recepient.substr(1) }</span>
                </div>
                <div className='chat-container' ref={ this.chatContainer }>
                    { conversation }
                </div>
                <TextBox onKeyDown={ this.onKeyDown } placeholder={ 'Message ' + this.props.recepient } />
            </>
        );
    }
}

export default connect(mapStateToProps)(ChatContainer);
