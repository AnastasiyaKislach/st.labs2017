import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {routing} from '../../actions/UserActions';

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.user);
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user);
        }

        checkAuth(user) {
            if (!user.isAuthenticated) {
                this.props.actions.routing();
            }
        }

        render() {
            return (
                <div>
                {this.props.user.isAuthenticated === true
                    ? <Component {...this.props} />
                    : null
                }
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
            actions: bindActionCreators({routing}, dispatch)
        }
    }


    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}