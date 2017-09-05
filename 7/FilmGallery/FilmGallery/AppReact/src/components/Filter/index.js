import React, { Component, PropTypes } from 'react';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        if (!e.target.value) {
            this.props.onChange(null, '');
        } else {
            var filteredList = this.state.list.filter(function(item) {
                    return item.Name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            });
            this.props.onChange(filteredList, e.target.value);
        }
    }

    render() {
        return (
             <div className='search-container'>
                 <span className='icon'>
                     <i className='glyphicon glyphicon-search'></i>
                 </span>
                 <input type='search' placeholder='Search...' className='search-input form-control' onChange={this.onChange}/>
             </div>
        );
    }
}
Filter.propTypes = {
    films: PropTypes.array.isRequired
};