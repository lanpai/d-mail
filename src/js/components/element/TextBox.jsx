import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import css from '../../../css/element/TextBox.scss';

class TextBox extends Component {
    constructor() {
        super();

        this.textarea = React.createRef();
        this.checkResize = this.checkResize.bind(this);
    }

    checkResize() {
        setTimeout(() => {
            this.textarea.current.style.height = 'auto';
            this.textarea.current.style.height = this.textarea.current.scrollHeight + 'px';
        }, 0);
    }

    render() {
        return (
            <div className='textbox'>
                <div>
                    <textarea
                        ref={ this.textarea }
                        onKeyDown={ this.checkResize }
                        placeholder={ this.props.placeholder }
                        rows={ 1 } />
                </div>
            </div>
        );
    }
}

export default TextBox;
