/// <reference path='../../actions/FetctAction.js' />
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FetchActions from '../../actions/FetchActions';
import '../../app_data/films.json';
import FilmItem from '../../components/FilmItem'

class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            films: this.props.films
        }
    }

    filterList(e) {
        var filteredList = this.props.films.filter(function(item){
            return item.name.toLowerCase().search(e.target.value.toLowerCase())!== -1;
        });
        // обновление состояния
        this.setState({films: filteredList});
    }

    render() {
        //this.props.actions.ajaxRequestFunction();

        var data = this.state.films;
        var filmsTemplate;

        if (data.length > 0) {
            filmsTemplate = data.map(function(item, index) {
                return (
                    <FilmItem data={item} key={index}/>
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
                             <input type='search' placeholder='Search...' className='search-input form-control' onChange={::this.filterList}/>
                         </div>
                     </div>
                     <div className='col-md-4'>
                         <select className='form-control'>
                             <option>Order by name</option>
                         </select>
                     </div>
                 </div>
                    <div className='films-container'>  
                        {filmsTemplate}
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        //user: state.user.email,
        films: state.fetch.data,
        auth: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FetchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)