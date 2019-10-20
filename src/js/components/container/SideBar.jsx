import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/container/SideBar.scss';

import SideBarElement from '../element/SideBarElement.jsx';

class SideBar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='side-bar'>
                <div>
                    <SideBarElement>@guy</SideBarElement>
                    <SideBarElement>@speaker</SideBarElement>
                    <SideBarElement>@user</SideBarElement>
                    <SideBarElement>@username</SideBarElement>
                    <SideBarElement>@person</SideBarElement>
                </div>
            </div>
        );
    }
}

export default SideBar;
