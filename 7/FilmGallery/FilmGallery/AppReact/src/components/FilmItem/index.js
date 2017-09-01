import React, { Component, PropTypes } from 'react';

import NavLink from '../../components/NavLink';
const filePath = '../../Images/';

export default class FilmItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: this.props.data.Id,
            name: this.props.data.Name,
            description: this.props.data.Description,
            poster: this.props.data.Poster,
            rate: this.props.data.Rating
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.data.Id,
            name: this.props.data.Name,
            description: this.props.data.Description,
            poster: this.props.data.Poster,
            rate: this.props.data.Rating
        });  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            id: nextProps.data.Id,
            name: nextProps.data.Name,
            description: nextProps.data.Description,
            poster: nextProps.data.Poster,
            rate: nextProps.data.Rating
        });
    }

    render() {
        const name = this.state.name;
        const id = name + '_' + this.state.id;
        const description = this.state.description;
        const posterPath = filePath + name + '/' + this.state.poster;
        const routePath = '/film/' + name.toLowerCase();
        const rate = this.state.rate;

        return (
            <div className='film-item' id= { id } >
                <div className='film-poster col-md-2'>
                    <img src={posterPath} className='img-responsive' />
                </div>
                <div className='film-title col-md-10'>
                    <NavLink to={routePath}><h3>{name}</h3></NavLink>
                    <p>{description}</p>
                    <p>Rating: {rate}</p>
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
