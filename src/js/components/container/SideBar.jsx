import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/container/SideBar.scss';

import ProfileElement from '../element/ProfileElement.jsx';
import SideBarElement from '../element/SideBarElement.jsx';

class SideBar extends Component {
    constructor() {
        super();

        this.state = {
            recentConv: [
                'guy',
                'speakers',
                'user',
                'username',
                'person',
                'test'
            ]
        }
    }

    render() {
        let recentConv = this.state.recentConv.map(nick => 
            <SideBarElement><i className="fas fa-at fa-fw"></i>{ nick }</SideBarElement>
        );

        return (
            <div className='side-bar'>
                <div>
                    <ProfileElement />
                    { recentConv }
                </div>
            </div>
        );
    }
}

export default SideBar;
