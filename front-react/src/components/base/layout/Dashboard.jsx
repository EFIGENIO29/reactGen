/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import moment from 'moment';
/** Material-UI */
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconOne from 'material-ui/svg-icons/action/home';
import IconTwo from 'material-ui/svg-icons/action/flight-takeoff';
import {fullWhite, fullBlack, blue500, blue900, grey600} from 'material-ui/styles/colors';
import IconEureka from 'styles/images/icons/001-eureka.png';
import IconServiceDesk from 'styles/images/icons/002-servicedesk.png';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';

/** Redux actions */
import * as AuthActions from 'actions/common/auth';
import * as ConfigurationActions from 'actions/common/configuration';
/** Custom components */

import RIF from 'components/legacySystems/RIF';

import AccessLog from 'components/base/layout/AccessLog';


const style = {
    width: '100%',
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
};

@connect((store) => {
    return {
        isAuthenticated: store.commonAuth.isAuthenticated,
        loginTimestamp: store.commonAuth.loginTimestamp,
        userInfo: store.commonAuth.userInfo,
        accessLog: store.commonAuth.accessLog,
        // Auth
        authProfileObj: store.commonAuth.profileObj,
        
    };
})

/**
 * 
 */
class Dashboard extends Component {
    constructor (props) {
        super(props);
        // Component state
        this.state = {
            expanded: false,
        };
    }
    
     
    render() {
        
        
    return (
        <div className='row'>
            <div className='col m12 s12'>
                <div className='right-align'>
                    <p className='welcome-text'>Bienvenido {this.props.authProfileObj.name} | <strong>Fecha de ingreso:</strong> {moment(this.props.loginTimestamp).format()}</p>
                </div>
            </div>
            
            {/*
            <AccessLog />            
            */}
            {
            <div className='col m12 s12'  style={{height:"2630px",overflow:'-webkit-paged-y'}}>
                <RIF />
            </div>
            }
        </div>
    );
  }
}
export default Dashboard;
