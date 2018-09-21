/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
/** Reset the state on logout */
import store from 'store';
import {persistStore} from 'redux-persist';
/** Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
/** DOM Manipulation */
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
/** Redux actions */
import * as AuthActions from 'actions/common/auth';
import * as DialogsActions from 'actions/common/dialogs';
import * as ConfigurationActions from 'actions/common/configuration';
import * as GapiActions from 'actions/common/gapi';
import * as MenuActions from 'actions/common/menu';
import * as IFrameActions from 'actions/legacySystems/iframe';
/** Custom Constants */
import * as SessionConstants from 'constants/session';
/** Custom Components */
import Dialogs from 'components/base/layout/Dialogs';
import Header from 'components/base/layout/Header';
import MenuLeft from 'components/base/layout/MenuLeft';
import ReduxToastr from "react-redux-toastr";
/** Images */
import LogoImg from 'styles/images/layout/logo-body.png';
/** Custom Styles */
const styles = {
    wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: '0.2em',
    }
};
const prefixedStyles = {};
/** Redux state */
@connect((store) => {
    return {
        isAuthenticated: store.commonAuth.isAuthenticated,
        userInfo: store.commonAuth.userInfo,
        menuOpen: store.commonMenu.open,
        authSessionTimeOutTimer: store.commonAuth.sessionTimeOutTimer,
        // Dialogs
        dialogUserWelcome: store.commonDialogs.userWelcome,
        dialogLoading: store.commonDialogs.loading,
        dialogSessionTimer: store.commonDialogs.sessionTimer,
        // Google API
        accessToken: store.commonAuth.accessToken
    };
})
/**
 * 
 */
class Layout extends Component {
    /**
     * 
     */
    constructor(props) {
        super(props);
        // Bind methods
        this._handleMenuToggle = this._handleMenuToggle.bind(this);
        this._handleLogoutOnClick = this._handleLogoutOnClick.bind(this);
        
        this._showDialogSessionTimer = this._showDialogSessionTimer.bind(this);

        this._handleMouseMove = this._handleMouseMove.bind(this);
        //
        this.sessionTimer = null;
        if ( this.props.dialogSessionTimer ) {
            this.props.dispatch(DialogsActions.updateSessionTimerOpen(false));
        }
    }
    /**
     * 
     */
    componentWillMount() {
        // Only the production enviroment can show the alert
        if (process.env.NODE_ENV === 'production') {
            /*window.onbeforeunload = (e) => {
                var dialogText = 'Esta seguro de querer recargar la pagina?';
                e.returnValue = dialogText;
                return dialogText;
            };*/
        }
    }
    /**
     * 
     */
    _handleMenuToggle() {
        this.props.dispatch(MenuActions.updateMenuOpen(!this.props.menuOpen));
    }
    /**
     * 
     */
    _handleLogoutOnClick() {
        persistStore(store).purge();
        this.props.dispatch(AuthActions.resetAuthData());
        this.props.dispatch(IFrameActions.resetIframeState());
        this.props.dispatch(MenuActions.resetMenuState());
        this.props.dispatch(GapiActions.resetMessagesUnread());
        this.props.dispatch(DialogsActions.resetState());
        this.props.dispatch(ConfigurationActions.resetState());
        GapiActions.googleLogOutAccount(this.props.accessToken);
        // Remove the element from the DOM
        window.$('iframe').remove();
        // Hard redirect
        window.location.href = '/';
        // Redirect to the login page
        /*this.props.dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: {
                pathname: '/login',
                search: '',
                hash: '',
                action: 'POP',
                key: null,
                query: {}
            }
        });*/
    }
    /**
     * @function Show the dialog that contains the Session Timer 
     */
    _showDialogSessionTimer() {
        if ( this.props.isAuthenticated && !this.props.dialogSessionTimer ) {
            if ( moment().diff(this.props.authSessionTimeOutTimer, 'seconds') >= SessionConstants.SESSION_DIALOG_COUNTDOWN_SHOW_TIMER ) {
                this.props.dispatch(DialogsActions.updateSessionTimerOpen(true));
            }
        }
    }
    /**
     * @function Update the session timer
     */
    _handleMouseMove() {
        if ( this.props.isAuthenticated && !this.props.dialogSessionTimer ) {
            this.props.dispatch(AuthActions.updateSessionTimer());
        }
    }
    /**
     * 
     */
    render() {
        const width = 2;
        const muiTheme = getMuiTheme();
        if (!prefixedStyles.main) {
            // do this once because user agent never changes
            const prefix = autoprefixer(muiTheme);
            prefixedStyles.wrapper = prefix(styles.wrapper);
            prefixedStyles.main = prefix(styles.main);
            prefixedStyles.body = prefix(styles.body);
            prefixedStyles.content = prefix(styles.content);
        }
        let idPage = (!this.props.isAuthenticated) ? 'login-page' : 'body-page' ;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={prefixedStyles.wrapper} onMouseMove={this._handleMouseMove}>
                    <div style={prefixedStyles.main}>
                        {/* Dialogs Components */}
                        <Dialogs _handleLogoutOnClick={this._handleLogoutOnClick} />
                        {this.props.isAuthenticated && (
                            <div>
                                <Header 
                                    _handleMenuToggle={this._handleMenuToggle}
                                    _handleLogoutOnClick={this._handleLogoutOnClick} />
                                <MenuLeft 		 	 
                                    close={this._handleMenuToggle} />
                                    
                            </div>
                        )}                        
                        <div id={idPage} className="body" style={prefixedStyles.body}>
                            <div id="component-wrapper" style={prefixedStyles.content}>{this.props.children}</div>
                        </div>
                    </div>
                    <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar/>
                </div>
            </MuiThemeProvider>	
        );
    }
    /**
     * 
     */
    componentDidMount() {
        // Session timer dialog loop
        this.sessionTimer = window.setInterval(
            this._showDialogSessionTimer,
            SessionConstants.SESSION_DIALOG_COUNTDOWN_SHOW_TIMER * 1000
        );
    }
}
export default Layout;
