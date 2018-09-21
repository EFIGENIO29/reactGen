/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
/** Material UI */
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import {blue500} from 'material-ui/styles/colors';
import {IconButton} from "material-ui";

const styles = {
    outer: {
        avatar: {
            marginTop: '10px'
        }
    },
    inner: {
        avatar: {
            marginTop: '18px'
        }
    }
};

@connect((store) => {
    return {
        // Auth
        authProfileObj: store.commonAuth.profileObj
    };
})
/**
 * 
 */
class Logout extends Component {
    constructor(props) {
        super(props);
        // Content Ref
        this.content = null;
    }
    _handleOnTouchTap = () => {
      // Update the top style attribute
      setTimeout(() => {
        window.$(this.content).parent().parent().parent().parent().parent().css({'top': 64});
      }, 100);
    }
  render() {
    return (
      <div className="col s3 m3 right">
        <IconMenu
              iconButtonElement={
                  <IconButton>
                      <Avatar
                        src={this.props.authProfileObj.imageUrl}
                        size={30}
                        style={styles.outer.avatar} />
                  </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}} 
              anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
              onTouchTap={this._handleOnTouchTap}
          >
            <div id='logout-content' ref={element => { this.content = element; }}>
              <div className="row">
                <div className="col m4 s6">
                  <center>
                    <Avatar 
                      src={this.props.authProfileObj.imageUrl}
                      size={80}
                      style={styles.inner.avatar} />
                  </center>
                </div>
                <div className="col m8 s6">
                  <p><strong>{this.props.authProfileObj.name}</strong></p>
                  <p>{this.props.authProfileObj.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col  s6 offset-s6">
                    <Link to="login" onClick={this.props._handleLogoutOnClick}>
                      <FlatButton label="Cerrar sesión"
                        labelStyle={{color: blue500}} />
                    </Link>
                </div>
              </div>
            </div>
          </IconMenu>
      </div>
    );
  }
}
Logout.propTypes = {
    _handleLogoutOnClick: PropTypes.function
};
export default Logout;
