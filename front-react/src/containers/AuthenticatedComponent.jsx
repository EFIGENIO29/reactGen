/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
/**
 * @desc Component authentification
 * @func requireAuthentication
 * @param LoadComponent {Component}
 */
export function requireAuthentication(LoadComponent) {
    class AuthenticatedComponent extends Component {
        componentWillMount () {
            this.checkAuth();
        }
        componentWillReceiveProps () {
            this.checkAuth();
        }
        checkAuth() {
            if (!this.props.isAuthenticated) {
                if (process.env.NODE_ENV !== 'testing') {
                    let redirectAfterLogin = this.props.location.pathname;
                    this.props.dispatch(push('/#/login'));
                    //this.props.dispatch(push('/#/login?next='+redirectAfterLogin));
                }
            }
        }
        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <LoadComponent {...this.props}/>
                        : null
                    }
                </div>
            );
        }
    }
    const mapStateToProps = (store) => ({
        isAuthenticated: store.commonAuth.isAuthenticated
    });
    return connect(mapStateToProps)(AuthenticatedComponent);
}
