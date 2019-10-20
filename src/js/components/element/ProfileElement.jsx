import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/element/ProfileElement.scss';

class ProfileElement extends Component {
    constructor() {
        super();

        this.state = {
            nick: 'KuriGohan',
            id: '23j6-19k5-13j5'
        };
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
                    <span>{ this.state.nick }</span><br />
                    <small>{ this.state.id }</small>
                </div>
            </div>
        );
    }
}

export default ProfileElement;
