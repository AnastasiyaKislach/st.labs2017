import React, { Component, PropTypes } from 'react';

import NavLink from '../../components/NavLink';
const filePath = '../../Images/';

export default class FilmItem extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const id = this.props.data.name + '_' + this.props.data.id;
        const name = this.props.data.name;
        const description = this.props.data.description;
        const posterPath = filePath + this.props.data.name + '/' + this.props.data.poster;
        const routePath = '/film/' + name.toLowerCase();

        return (
            <div className='film-item' id= { id } >
                <div className='film-poster col-md-2'>
                    <img src={posterPath} className='img-responsive' />
                </div>
                <div className='film-title col-md-10'>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <NavLink to={routePath}>More >></NavLink>
                </div>
            </div>
        );
    }
}

FilmItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        name: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        gallery: PropTypes.array.isRequired
    })
};
