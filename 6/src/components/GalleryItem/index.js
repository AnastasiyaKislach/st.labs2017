
import React, { Component } from 'react';

export default class GalleryItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='image-container'>
                <img src={this.props.src} className='img-responsive' />
            </div>
        );
    }
}

