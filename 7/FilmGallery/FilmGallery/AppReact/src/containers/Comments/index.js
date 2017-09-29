
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FetchActions from '../../actions/FetchActions';

import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
            comments: this.props.comments,
            filmId: this.props.filmId
        }
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        this.setState({
            comments: this.props.comments,
            filmId: this.props.filmId
        });  
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            comments: nextProps.comments,
            filmId: nextProps.filmId
        });  
    }

    addComment(comment){
        this.props.actions.createComment(comment);
    }

    render() {       
        return(
            <div className='row'>
                <CommentList comments={this.state.comments}/>
                <CommentForm filmId={this.state.filmId} addComment={this.addComment}/>
            </div>
        );

    }

}
function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)



CommentContainer.propTypes = {
    comments: PropTypes.array,
    filmId: PropTypes.string,
    user: PropTypes.string.isRequired
};
