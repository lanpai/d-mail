import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from '../../../css/container/SideBar.scss';

import ProfileElement from '../element/ProfileElement.jsx';
import SideBarElement from '../element/SideBarElement.jsx';

const mapStateToProps = state => {
    return {
        active: state.active,
        recent: state.recent
    }
};

class SideBar extends Component {
    constructor() {
        super();
    }

    render() {
        let recentConv = this.props.recent.map(nick => 
            <SideBarElement active={ (this.props.active.substr(1) === nick) ? true : false }>
                <i className="fas fa-at fa-fw"></i>{ nick }
            </SideBarElement>
        );

        return (
            <div className='side-bar'>
                <div>
                    <ProfileElement />
                    <div className='recent'>
                        { recentConv }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SideBar);
