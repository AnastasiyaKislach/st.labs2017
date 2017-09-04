
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {changeRating} from '../../actions/FetchActions';

import Star from '../Star'

class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10,
            marked: 0
        }
        this.rateHandler = this.rateHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            marked: this.props.marked
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            marked: nextProps.marked
        });
    }

    rateHandler(index) {
        //this.setState({
        //    marked: index
        //});

        let rating = {
            FilmId: this.props.filmId,
            Rate: index
        }

        this.props.actions.changeRating(rating);
    }

    render() {

        let starTemplate = [],
            count = this.state.count,
            marked = this.state.marked;

        for (let i = 0, k = 0; i < count; i++, k++) {
            let isMarked = false;
            if (k < marked) {
                isMarked = true;
            }
            starTemplate.push(<Star index={i} key={i} isMarked={isMarked} changeRate={this.rateHandler}/>);
    }
       
    return(
         <div className='film-rate'>
            {starTemplate}
        </div>
        );
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({changeRating}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rate)



Rate.propTypes = {
    marked: PropTypes.number
}