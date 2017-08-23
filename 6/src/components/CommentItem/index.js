import React, { Component } from 'react';

export default class CommentItem extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const userName = this.props.user;
        const dataTime = this.props.dataTime;
        const text = this.props.text;

        return (
            <div className='comment-item'>
                <div className='col-md-2'>
                    <p>{userName}</p>
                    <p>{dataTime}</p>
                </div>
                <div className='col-md-10'>
                    <p>{text}</p>
                </div>
            </div>
        );
    }
}
