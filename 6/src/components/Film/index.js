import React, { Component } from 'react';
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
        const differentComments = this.props.film !== nextProps.film;
        if (differentComments) {
            this.setState({film: nextProps.film});
        }
      
        return differentComments;
    }

    shouldComponentUpdate(nextProps) {
        const differentComments = this.props.film !== nextProps.film;
        if (differentComments) {
            this.setState({film: nextProps.film});
        }
      
        return differentComments;
    }
    render() {
        const posterPath = filePath + this.props.film.name + '/' + this.props.film.poster;
        return (
             <div className='container film-container'>
                <div className='row'>
                    <div className='film-poster col-md-4'>
                        <div className='film-poster'>
                            <img src={posterPath} className='img-responsive' />
                        </div>
                       <Rate count={10} marked={this.props.film.rate}/>
                    </div>
                    <div className='film-title col-md-8'>
                        <h3>Maecenas etos sit amet</h3>
                        <p> { this.props.film.description}</p>
                    </div>
                </div>

                <Gallery photos={this.props.film.gallery} filmName={this.props.film.name}/>
               <CommentContainer comments={this.props.film.comments} filmId={this.props.film.id} user={'sdf'}/>

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