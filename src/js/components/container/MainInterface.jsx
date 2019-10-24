import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/container/MainInterface.scss';

import ChatContainer from './ChatContainer.jsx';
import SideBar from './SideBar.jsx';
import ServerList from './ServerList.jsx';

const mapStateToProps = state => {
    return {
        active: state.active
    }
};

class MainInterface extends Component {
    constructor() {
        super();
    }

    render() {
        let active = <></>;
        switch (this.props.active[0]) {
            case '@':
                active = <ChatContainer key={ this.props.active } target={ this.props.active } />;
                break;
        }

        return (
            <>
                <div className='active-wrapper'>
                    { active }
                </div>
                <ServerList />
                <SideBar />
            </>
        );
    }
}

export default connect(mapStateToProps)(MainInterface);
