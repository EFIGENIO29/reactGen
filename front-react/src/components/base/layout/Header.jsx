/**
 * 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
/** Material UI */
import AppBar from "material-ui/AppBar"; 
/** Redux actions */
import * as gapiActions from 'actions/common/gapi';
/** Custom Constants */
import * as GapiConstants from 'constants/gapi';
/** Custom Components */
import HeaderLogo from 'components/base/layout/HeaderLogo';
import Configuration from 'components/base/layout/Configuration';
import UnreadMessages from 'components/base/layout/UnreadMessages';
import AppMenu from 'components/base/layout/AppMenu';
import Logout from 'components/base/layout/Logout';

@connect((store) => {
    return {
        isAuthenticated: store.commonAuth.isAuthenticated,
        googleId: store.commonAuth.googleId,
        accessToken: store.commonAuth.accessToken,
        messagesUnread : store.commonGapi.messagesUnread,
        backgroundColor : store.commonLayout.backgroundColor,
    };
})
/**
 * 
 */
class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if ( this.props.accessToken != null ) {
          this.props.dispatch(gapiActions.updateMessagesUnread(this.props.accessToken));
          window.setInterval(() => {
            if ( this.props.isAuthenticated === true ) {
              this.props.dispatch(gapiActions.updateMessagesUnread(this.props.accessToken));
            }
          }, GapiConstants.GAPI_UPDATE_MESSAGES_UNREAD * 1000);
        }
    }
    render() {
        return (
            <AppBar 
                title={<HeaderLogo />}
                style={{backgroundColor: this.props.backgroundColor}}
                onLeftIconButtonTouchTap={this.props._handleMenuToggle}
                iconElementRight={
                    <div>
                        <Logout _handleLogoutOnClick={this.props._handleLogoutOnClick} />
                        <AppMenu />
                        <UnreadMessages data={this.props.messagesUnread} />
                        {/*<Configuration />*/}
                    </div>
                } />
        );
    }
}
Header.propTypes = {
    _handleMenuToggle: PropTypes.func,
    _handleLogoutOnClick: PropTypes.func
};
export default Header;
