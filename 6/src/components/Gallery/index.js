
import React, { Component, PropTypes } from 'react';
import GalleryItem from '../../components/GalleryItem'

const filePath = '../../Images/';

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            start: 0,
            end: 3,
            template: [],
            total: 0
        }

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            total: nextProps.photos.length
        });
    }

    prev() {
        if (this.state.start > 0) {
            this.setState({
                start: this.state.start - 1,
                end: this.state.end - 1
            });
        }
    }

    next() {
        if (this.state.end !== this.state.total-1) {
            this.setState({
                start: this.state.start + 1,
                end: this.state.end + 1
            });
        }
    }

    render() {

        const imgPath = filePath + this.props.filmName + '/';

        let galleryTemplate = null;

        if (this.props.photos) {

            let showSlides = this.props.photos.slice(this.state.start, this.state.end);
            
            galleryTemplate = showSlides 
            ? showSlides.map(function(item, index) {
                return(
                    <GalleryItem src={imgPath + item} data={item} key={index}/>
                );
            })
            : null;
        }
       
        return(
            <div className='row'>
                <div className='slider-box' id='slider'>
                    <div className='control-container'>
                        <a className='left-control'  onClick={this.prev}>
                            <span className='glyphicon glyphicon-chevron-left'></span>
                        </a>
                    </div>
                    {galleryTemplate}
                    <div className='control-container'>
                        <a className='right-control' onClick={this.next}>
                            <span className='glyphicon glyphicon-chevron-right'></span>
                        </a>
                    </div>
                </div>
                <div className='clearfix'></div>
            </div>
        );
    }
}

Gallery.propTypes = {
    photos: PropTypes.array
};