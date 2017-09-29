
import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id='myModal' class='modal fade'>
                <div class='modal-dialog'>
                    <img src={this.props.src} id='fullImg' />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    src: PropTypes.string.isRequired
};
