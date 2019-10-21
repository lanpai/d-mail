import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/element/TextBox.scss';

class TextBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='textbox'>
                <div>
                    <textarea placeholder={ this.props.placeholder } rows={ 1 } />
                </div>
            </div>
        );
    }
}

export default TextBox;
