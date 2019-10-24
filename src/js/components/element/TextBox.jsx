import React, { Component } from 'react';

import css from '../../../css/element/TextBox.scss';

class TextBox extends Component {
    constructor() {
        super();

        this.textarea = React.createRef();
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        this.props.onKeyDown && (this.subOnKeyDown = this.props.onKeyDown.bind(this.textarea.current));
    }

    onKeyDown(e) {
        this.subOnKeyDown(e);

        setTimeout(() => {
            this.textarea.current.style.height = 'auto';
            this.textarea.current.style.height = this.textarea.current.scrollHeight + 1 + 'px';
        }, 0);
    }

    render() {
        return (
            <div className='textbox'>
                <div>
                    <textarea
                        ref={ this.textarea }
                        onKeyDown={ this.onKeyDown }
                        placeholder={ this.props.placeholder }
                        rows={ 1 } />
                </div>
            </div>
        );
    }
}

export default TextBox;
