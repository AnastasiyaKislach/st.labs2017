import React, { Component } from 'react'
import NavLink from '../../components/NavLink'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/UserActions';

class NavigationBar extends Component{
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.user
        }
        this.props.actions.setCurrentUser();
    }

    logout(e) {
        e.preventDefault();
        this.props.actions.logout();
    }

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

        let filmLink = null;

        if (this.props.film) {
            let filmName = this.props.film, 
            link = '/film/' + filmName,
            filnNameFirstLetter = filmName.charAt(0).toUpperCase() + filmName.substr(1);

            filmLink = (
                <NavLink to={link} className='navbar-text' onlyActiveOnIndex={true}>{filnNameFirstLetter}</NavLink> 
            );
        }
       
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
                         {filmLink || null}
                   </div>
                   <div className='navbar-collapse collapse navbar-right'>
                      {this.props.user.isAuthenticated ? userLinks : guestLinks }
                   </div>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
  

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);