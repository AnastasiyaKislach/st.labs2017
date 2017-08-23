
import React, { Component } from 'react';
import Star from '../Star'


export default class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 5,
            marked: 0
        }
        this.rateHandler = this.rateHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            count: nextProps.count,
            marked: nextProps.marked
        });
    }

    rateHandler(index) {
        this.setState({
            marked: index
        });
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

