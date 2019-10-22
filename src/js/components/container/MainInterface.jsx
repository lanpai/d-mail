import React, { Component } from 'react';

import css from '../../../css/container/MainInterface.scss';

import ChatContainer from './ChatContainer.jsx';
import SideBar from './SideBar.jsx';
import ServerList from './ServerList.jsx';

class MainInterface extends Component {
    constructor() {
        super();

        this.state = {
            main: '@test'
        };
    }

    render() {
        let main = <></>;
        switch (this.state.main) {
            case '@test':
                main = <ChatContainer />;
                break;
        }

        return (
            <>
                <div className='main-wrapper'>
                    { main }
                </div>
                <ServerList />
                <SideBar />
            </>
        );
    }
}

export default MainInterface;
