import React, { Component } from 'react';

import{
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    DEFAULT
} from '../../constants/Sorting'

import * as Sortings from '../../sorting/Sorting'


export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '?',
            options: [
                {
                    name: 'Select…',
                    value: null
                },
                {
                    name: 'Default',
                    value: DEFAULT
                },
                {
                    name: 'Order by name',
                    value: ORDER_BY_NAME
                },
                {
                    name: 'Order by rating',
                    value: ORDER_BY_RATING
                }
            ], 
            list: this.props.films
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            list: this.props.films
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.films
        });
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });

        var filteredList;
        switch(e.target.value) {
            case ORDER_BY_NAME:
                filteredList = Sortings.orderByName(this.state.list);
                break;
                
            case ORDER_BY_RATING:  
                filteredList = Sortings.orderByRating(this.state.list);
                break;
                
            default:
                filteredList = Sortings.orderById(this.state.list);
                break;
        }

        this.props.onChange(filteredList);
    }

    render() {
        const createItem = (item, key) =>
            <option key={key} value={item.value}>
                {item.name}
            </option>;
        return (
            <div>
                <select onChange={this.onChange} value={this.state.value} className='form-control'>
                    {this.state.options.map(createItem)}
                </select>
            </div>
        );
    }
}