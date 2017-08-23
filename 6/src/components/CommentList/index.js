
import React, { Component, PropTypes } from 'react';

import CommentItem from '../../components/CommentItem'

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments
        }
    }
    
    shouldComponentUpdate(nextProps) {
        const differentComments = this.props.comments !== nextProps.comments;
        if (differentComments) {
            this.setState({comments: nextProps.comments});
        }
      
        return differentComments;
    }

    render() {
        let comments = this.props.comments,
            commentsTemplate;
        if(comments && comments.length) {
            commentsTemplate = comments.map(function(item, index) {
                return(
                    <CommentItem user={item.user} dataTime={item.dataTime} text={item.text} key={index}/>
                );
            });
        } else {
            commentsTemplate = <p>К сожалению, комментариев нет</p>;
        }
        
        return(
            <div className='comment-container'>
                {commentsTemplate}
            </div>
        );
    }
}

CommentList.propTypes = {
    comments: PropTypes.array
};