
import React, { Component } from 'react';


export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarked: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({
            isMarked: !this.state.isMarked
        });
        this.props.changeRate(this.props.index + 1);
    }

    componentDidMount() {
        this.setState({
            isMarked: this.props.isMarked
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isMarked: nextProps.isMarked
        });
    }

    render() {
        let template = this.state.isMarked
            ? <i className='glyphicon glyphicon-star'></i>
            : <i className='glyphicon glyphicon-star-empty'></i>;

        return(
            <a onClick={this.clickHandler}>{template}</a> 
        );
    }
}

