
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FetchActions from '../../actions/FetchActions';

import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments
        }
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        this.setState({comments: this.props.comments});  
    }

    componentWillReceiveProps(nextProps) { 
        const differentComments = this.props.comments !== nextProps.comments;
        if (differentComments) {
            this.setState({comments: nextProps.comments});
        }
      
        return differentComments;
    }

    addComment(comment){
        var nextComments = [].concat(this.state.comments, comment);
        this.setState({comments: nextComments});
        this.props.actions.createComment(comment);
    }

    render() {       
        return(
            <div className='row'>
                <CommentList comments={this.state.comments}/>
                <CommentForm filmId={this.props.filmId} user={this.props.user} addComment={this.addComment}/>
            </div>
        );

    }

}
function mapStateToProps() {
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)