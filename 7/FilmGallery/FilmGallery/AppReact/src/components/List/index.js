import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FetchActions from '../../actions/FetchActions';
import FilmItem from '../../components/FilmItem'
import Select from '../../components/Select'
import Filter from '../../components/Filter'

class List extends Component {
    constructor (props) {
        super(props);
        this.props.actions.getFilms();
        this.state = {
            user: this.props.user,
            films: this.props.films
        }
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentDidMount() {
        this.setState({
            films: this.props.films
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            films: nextProps.films
        });
    }


    onChangeFilter(filteredList, val) {
        if (!val) {
            this.setState({ films: this.props.films });
        } else {
            this.setState({films: filteredList});
        }
    }

    onChangeSelect(filteredList) {
        this.setState({
            films: filteredList
        });
    }
   
    render() {
        let data = this.state.films,
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
                        <Filter onChange={this.onChangeFilter} films={this.state.films}/>
                    </div>
                    <div className='col-md-4'>
                        <Select onChange={this.onChangeSelect} films={this.state.films}/>
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


List.propTypes = {
    films: PropTypes.array.isRequired,
    user:PropTypes.string.isRequired
};