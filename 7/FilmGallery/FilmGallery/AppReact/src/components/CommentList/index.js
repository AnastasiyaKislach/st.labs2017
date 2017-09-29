
import React, { Component, PropTypes } from 'react';

import CommentItem from '../../components/CommentItem'

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments
        }
    }
    
    
    componentDidMount() {
        this.setState({
            comments: this.props.comments
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            comments: nextProps.comments
        });
    }
    
    render() {
        let comments = this.state.comments,
            commentsTemplate;
        if(comments && comments.length) {
            commentsTemplate = comments.map(function(item, index) {
                return(
                    <CommentItem user={item.UserName} dataTime={item.Date} text={item.Text} key={index}/>
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