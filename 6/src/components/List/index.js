import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FetchActions from '../../actions/FetchActions';
import FilmItem from '../../components/FilmItem'

class List extends Component {
    constructor (props) {
        super(props);
        this.props.actions.getFilms();
        this.state = {
            user: this.props.user,
            films: this.props.films
        }
        this.filterList = this.filterList.bind(this);
    }

    filterList(e) {
        var filteredList = this.props.films.filter(function(item){
            return item.name.toLowerCase().search(e.target.value.toLowerCase())!== -1;
        });
       
        this.setState({films: filteredList});
    }

    render() {
        let data = this.props.films,
        filmsTemplate = null;
     
        if (data.length > 0) {
            filmsTemplate = data.map(function(item, index) {
                return (
                    <FilmItem data={item} key={index} />
                    );
            });
        }
        
        return (
             <div className='container'>
                 <div className='search-group row'>
                     <div className='col-md-8 box'>
                         <div className='container-1'>
                             <span className='icon'>
                             <i className='glyphicon glyphicon-search'></i></span>
                             <input type='search' placeholder='Search...' className='search-input form-control' onChange={this.filterList.bind(this)}/>
                         </div>
                     </div>
                     <div className='col-md-4'>
                         <select className='form-control'>
                             <option>Order by name</option>
                         </select>
                     </div>
                 </div>
                 <div className='films-container'>  
                    { filmsTemplate }
                 </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.email,
        films: state.fetch.films
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)