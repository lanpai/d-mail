import React, { Component } from 'react';
//import { connect } from 'react-redux';

import css from '../../../css/element/SideBarElement.scss';

import { switchActive } from '../../../actions';

class ConversationElement extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        switchActive(this.props.id);
    }

    render() {
        return (
            <div className='side-bar-element'>
                <div onClick={ this.onClick } className={ this.props.active ? 'active' : '' }>
                    { (this.props.id[0] === '@') ?
                        <i className="fas fa-at fa-fw"></i> :
                        <i className="fas fa-hashtag fa-fw"></i> }
                    { this.props.id.substr(1) }
                </div>
            </div>
        );
    }
}

export default ConversationElement;
