import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/container/MainInterface.scss';

import SideBar from './SideBar.jsx';
import ServerList from './ServerList.jsx';

class MainInterface extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <>
                <div className='main-wrapper'>
                    { this.props.children }
                </div>
                <ServerList />
                <SideBar />
            </>
        );
    }
}

export default MainInterface;

const wrapper = document.getElementById("main-interface");
wrapper ? ReactDOM.render(<MainInterface />, wrapper) : false;
