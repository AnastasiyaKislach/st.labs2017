import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions/AuthActions';

class NavigationBar extends Component{
    constructor (props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        this.props.actions.logout();
    }

    componentDidMount() {
        console.log('componentDidMount - navbar');
        this.props.actions.setCurrentUser();
    }

    //componentWillMount() {
    //    console.log('componentWillMount - navbar');
    //    this.props.actions.setCurrentUser();
    //}

    render() {
       
        const userLinks = (
            <ul className='nav navbar-nav'>
                <NavLink className='navbar-text'>{this.props.user.email}</NavLink>
                <NavLink to='/login' className='navbar-text'  onClick={this.logout.bind(this)}>Logout</NavLink>
            </ul>
        );
  
        const guestLinks = (
            <ul className='nav navbar-nav'>
                <NavLink to='/login' className='navbar-text' onlyActiveOnIndex={true}>Login</NavLink>
            </ul>
        );

        return (
            <div className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                         </button>
                         <NavLink to='/' className='navbar-text' onlyActiveOnIndex={true}> Films Gallery</NavLink>
                   </div>
                   <div className='navbar-collapse collapse navbar-right'>
                      {this.props.user.isAuthenticated ? userLinks :guestLinks }
                   </div>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        auth: state.auth.isAuthenticated
    };
}
  

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);