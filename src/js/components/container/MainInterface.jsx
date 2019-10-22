import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/container/MainInterface.scss';

import ChatContainer from './ChatContainer.jsx';
import SideBar from './SideBar.jsx';
import ServerList from './ServerList.jsx';

const mapStateToProps = state => {
    return {
        main: state.main
    }
};

class MainInterface extends Component {
    constructor() {
        super();
    }

    render() {
        let main = <></>;
        switch (this.props.main[0]) {
            case '@':
                main = <ChatContainer recepient={ this.props.main.substr(1) } />;
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

export default connect(mapStateToProps)(MainInterface);
