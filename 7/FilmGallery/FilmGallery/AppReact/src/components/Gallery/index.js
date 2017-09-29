
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
            total: 0,
            filmName: this.props.filmName
        }

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    
    componentDidMount() {
        this.setState({
            photos: this.props.photos,
            filmName: this.props.filmName,
            end: this.props.photos.length > 2 ? 3 : this.props.photos.length
        });  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            photos: nextProps.photos,
            total: nextProps.photos ? nextProps.photos.length : 0,
            filmName: nextProps.filmName,
            end: nextProps.photos.length > 2 ? 3 : nextProps.photos.length
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
        if (this.state.end !== this.state.total) {
            this.setState({
                start: this.state.start + 1,
                end: this.state.end + 1
            });
        }
    }

    render() {

        const imgPath = filePath + this.state.filmName + '/';

        let galleryTemplate = null;

        if (this.state.photos) {

            let showSlides = this.state.photos.slice(this.state.start, this.state.end);
            
            galleryTemplate = showSlides 
            ? showSlides.map(function(item, index) {
                return(
                    <GalleryItem src={imgPath + item.Url} data={item.Url} key={index}/>
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