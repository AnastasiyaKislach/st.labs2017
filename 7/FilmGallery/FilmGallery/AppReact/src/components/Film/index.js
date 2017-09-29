import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FetchActions from '../../actions/FetchActions';

import Gallery from '../../components/Gallery';
import Rate from '../../components/Rate';
import CommentContainer from '../../containers/Comments';

const filePath = '../../Images/';

class Film extends Component {
    constructor (props) {
        super(props);
        this.props.actions.getFilm(this.props.params.film);
        this.state = {
            film: this.props.film
        }
    }
    componentDidMount() {
        this.setState({film: this.props.film});  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            film: nextProps.film
        });
    }

    render() {
        const posterPath = filePath + this.state.film.Name + '/' + this.state.film.Poster;
        return (
             <div className='container film-container'>
                <div className='row'>
                    <div className='film-poster col-md-4'>
                        <div className='film-poster'>
                            <img src={posterPath} className='img-responsive' />
                        </div>
                        <Rate marked={this.props.film.Rating} filmId={this.props.film.Id}/>
                    </div>
                    <div className='film-title col-md-8'>
                        <h3>{ this.state.film.Name}</h3>
                        <p> { this.state.film.Description}</p>
                    </div>
                </div>
                <Gallery photos={this.state.film.Images} filmName={this.state.film.Name}/>
                <CommentContainer comments={this.state.film.Comments} filmId={this.state.film.Id}/>
            </div>
        );
    }
}
   
              
function mapStateToProps(state) {
    return {
        film: state.fetch.film
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film)

Film.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    }),
    film: PropTypes.shape({
        id: PropTypes.string, 
        name: PropTypes.string,
        poster: PropTypes.string,
        gallery: PropTypes.array
    })
};