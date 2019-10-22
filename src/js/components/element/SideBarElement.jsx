import React, { Component } from 'react';

import css from '../../../css/element/SideBarElement.scss';

class SideBarElement extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='side-bar-element'>
                <div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default SideBarElement;
