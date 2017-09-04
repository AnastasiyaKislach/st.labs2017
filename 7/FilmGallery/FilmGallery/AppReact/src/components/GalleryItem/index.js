
import React, { Component, PropTypes } from 'react';


export default class GalleryItem extends Component {
    constructor(props) {
        super(props);
        this.showFullImage = this.showFullImage.bind(this);
    }

    render() {
        return(
            <div className='image-container'>
                <img src={this.props.src} className='img-responsive'/>
            </div>
        );
    }
}

GalleryItem.propTypes = {
    src: PropTypes.string.isRequired
};
