import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/container/ChatContainer.scss';

import Message from '../element/Message.jsx';
import TextBox from '../element/TextBox.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        conversation: state.history[ownProps.recepient] || []
    }
};

class ChatContainer extends Component {
    constructor() {
        super();
    }

    render() {
        let conversation = this.props.conversation.map((message, index) =>
            <Message key={ index } nick={ message.author }>{ message.body }</Message>
        );
        return(
            <>
                <div className='header'>
                    <i className="fas fa-at fa-fw"></i><span className='nick'>{ this.props.recepient }</span>
                </div>
                <div className='chat-container'>
                    { conversation }
                </div>
                <TextBox placeholder={ 'Message @' + this.props.recepient } />
            </>
        );
    }
}

export default connect(mapStateToProps)(ChatContainer);
