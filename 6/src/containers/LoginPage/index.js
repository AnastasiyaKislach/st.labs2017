import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';

import '../../styles/styles.scss';

export class LoginPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.user
        }
        this.props.actions.setCurrentUser();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.login({
            email: e.target.elements[0].value,
            password: e.target.elements[1].value
        });
    }
    render() {
        return (
            <div>
              <form className='form-login form-horizontal'  onSubmit={this.handleSubmit}>
                  <h4>Log in to Film Gallery</h4>
                  <hr />
                  <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Email' />
                  </div>
                  <div className='form-group'>
                      <input className='form-control valid' type='password' placeholder='Password' />
                  </div>
                  <div className='form-group'>
                      <input type='submit' value='Login' className='btn btn-default' />
                  </div>
             </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)