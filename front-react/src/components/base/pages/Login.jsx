/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { push, replace } from 'react-router-redux';
import _ from 'underscore';
import moment from 'moment';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
/** Redux actions */
import * as AuthActions from 'actions/common/auth';
import * as DialogsActions from 'actions/common/dialogs';
/** Custom constants */
import * as DialogsConstants from 'constants/dialogs';
import * as gapiConstants from 'constants/gapi';
import * as LoginConstants from 'constants/login';
/** Images */
import LogoImg from 'styles/images/layout/logo-login.png';

import Dashboard from 'components/base/layout/Dashboard';
import Facultad from 'components/base/layout/Facultades';


@connect((store) => {
    return {
        isAuthenticated: store.commonAuth.isAuthenticated,
        googleId: store.commonAuth.googleId,
        tokenId: store.commonAuth.tokenId,
        accessToken: store.commonAuth.accessToken,
        tokenObj: store.commonAuth.tokenObj,
        profileObj: store.commonAuth.profileObj,
    };
})
/**
 * 
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.redirectRoute = null;
  }
  componentWillMount() {
  }
  /**
   * 
   */
  componentWillReceiveProps(nextProps) {
    if ( !_.isUndefined(nextProps.isAuthenticated) && nextProps.isAuthenticated === true ) {
      //this.props.dispatch(replace('/#' + this.redirectRoute));
      //browserHistory.push('/#' + this.state.redirectTo);
    }
  }
  /**
   * 
   */
  onSuccessResponseGoogle = (response) => {
      this.props.dispatch(AuthActions.updateAuthData(response));
      //window.location.href = '/#/home';
      //this.props.dispatch(replace('/#/home'));
      this.props.dispatch(push('/#/home'));
  }
  /**
   * 
   */
  onFailureResponseGoogle = (errorData) => {
      console.log('Login | error: ', errorData);
      switch(errorData.error) {
        case 'idpiframe_initialization_failed':
        case 'popup_closed_by_user':
        case 'access_denied':
        case 'immediate_failed':
          this.props.dispatch(DialogsActions.updateLoginErrorText(DialogsConstants.DIALOGS_LOGIN_ERROR_TEXT_POPUP));
          this.props.dispatch(DialogsActions.updateLoginErrorOpen(true));
        break;
      }
  }
  /**
   * 
   */
  render() {
    return (
      <div id="login">
        {this.props.isAuthenticated === false && (
          <div className="wrapLogin">
            <div className="headLogin">
              <h3>Inicio de sesión</h3>
            </div>
            <div className="bodyLogin">
              <img src={LogoImg} alt="Logo Finaciera" />
              <div>
                <GoogleLogin 
                  clientId={gapiConstants.GAPI_CLIENT_ID}
                  onSuccess={this.onSuccessResponseGoogle}
                  onFailure={this.onFailureResponseGoogle}
                  scope={LoginConstants.LOGIN_BUTTON_SCOPE}>
                    <FontAwesome name='google-plus'/>
                    <span> {LoginConstants.LOGIN_BUTTON_TEXT}</span>
                </GoogleLogin>
              </div>
            </div>
          </div>
        )}
        {this.props.isAuthenticated === true && (
          <div>
            <Dashboard />
            {/*
              <p><strong>loginTimestamp:</strong> <span ref="loginTimestamp">{moment(this.props.loginTimestamp).format()}</span></p>
              <p><strong>googleId:</strong> <span ref="googleId">{this.props.googleId}</span></p>
              <p><strong>tokenId:</strong> <span ref="tokenId">{this.props.tokenId}</span></p>
              <p><strong>accessToken:</strong> <span ref="accessToken">{this.props.accessToken}</span></p>
              <p><strong>tokenObj:</strong> <span ref="tokenObj">{JSON.stringify(this.props.tokenObj, null, "\t")}</span></p>
              <p><strong>profileObj:</strong> <span ref="profileObj">{JSON.stringify(this.props.profileObj, null, "\t")}</span></p>
              {!_.isUndefined(this.props.profileObj) && (
                <p><strong>Foto:</strong> <img ref="photo" src={this.props.profileObj.imageUrl} /></p>
              )}
            */}
          </div>
        )}
      </div>
    );
  }
  /**
   * 
   */
    componentDidMount() {
        this.redirectRoute = this.props.location.query.next || '/home';
    }
}

export default Login;
