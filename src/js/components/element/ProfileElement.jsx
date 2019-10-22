import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/element/ProfileElement.scss';

const mapStateToProps = state => {
    return {
        id: state.client.id,
        nick: state.client.nick
    }
};

class ProfileElement extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='profile-element'>
                <div>
                    <div className='profile-menu'>
                        <i className='fas fa-cog fa-fw'></i>
                        <i className='fas fa-microphone fa-fw'></i>
                        <i className="fas fa-volume-up fa-fw"></i>
                    </div>
                    <span>{ this.props.nick }</span><br />
                    <small>{ this.props.id }</small>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProfileElement);
