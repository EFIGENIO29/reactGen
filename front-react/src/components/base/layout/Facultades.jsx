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
import FlatButton from 'material-ui/FlatButton';
/** Redux actions */
import * as AuthActions from 'actions/common/auth';
import * as ConfigurationActions from 'actions/common/configuration';
/** Custom components */
import SelectFieldCompanySIF from 'components/base/forms/SelectFieldCompanySIF';
import SelectFieldCompanySIC from 'components/base/forms/SelectFieldCompanySIC';
import AccessLog from 'components/base/layout/AccessLog';
/** Custom Constants */
import {selectOptionsSIF, selectOptionsSIC} from 'constants/configuration';

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
        // Company Selected: SIF and SIC
        userCanSeeSIF: store.commonConfiguration.userCanSeeSIF,
        companySIF: store.commonConfiguration.companySIF,
        companyTemporalSIF: store.commonConfiguration.companyTemporalSIF,
        userCanSeeSIC: store.commonConfiguration.userCanSeeSIC,
        companySIC: store.commonConfiguration.companySIC,
        companyTemporalSIC: store.commonConfiguration.companyTemporalSIC
    };
})

/**
 * 
 */
class Facultades extends Component {
    constructor (props) {
        super(props);
        // Component state
        this.state = {
            expanded: false,
        };
    }
    _handleExpandChange = (expanded) => {
        this.setState({
            expanded: expanded
        });
    }
    _handleCancelOnClick = () => {
        if ( this.props.userCanSeeSIF === true ) {
            this.props.dispatch(ConfigurationActions.updateTemporalSIF(null));
        }
        if ( this.props.userCanSeeSIC === true ) {
            this.props.dispatch(ConfigurationActions.updateTemporalSIC(null));
        }
        // Close the Card
        this.setState({
            expanded: false
        });
    }
    _handleSaveOnClick = () => {
        if ( this.props.userCanSeeSIF === true ) {
            this.props.dispatch(ConfigurationActions.updateSIF(this.props.companyTemporalSIF));
        }
        if ( this.props.userCanSeeSIC === true ) {
            this.props.dispatch(ConfigurationActions.updateSIC(this.props.companyTemporalSIC));
        }
        // Close the Card
        this.setState({
            expanded: false
        });
    }
    render() {

        const UserCompanyConfigurationActions = [
            <FlatButton key={1}
                label="Cancelar"
                onTouchTap={this._handleCancelOnClick}
                labelStyle={{color: fullBlack}} />,
            <FlatButton key={2}
                label="Guardar"
                onTouchTap={this._handleSaveOnClick}
                labelStyle={{color: blue500}} />
        ];
    return (
        <div className='row'>
            <div className='col m12 s12'>
                <div className='left-align'>
                    <p className='welcome-text'>Catálogo Facultades</p>
                </div>
            </div>
            { (
                <div className='col m12 s12'>
                    
                    <Card 
                        expanded={this.state.expanded} 
                        onExpandChange={this._handleExpandChange} 
                        id='home-company-selection'>
                        <CardHeader
                            children={
                                <div className='row'>
                                    <div className='col m3 s12'>
                                        <p style={{color: blue900, marginLeft: '20px', marginTop: 0, marginBottom: 0}}>Empresas activas</p>
                                    </div>
                                    {this.props.userCanSeeSIF === true && (
                                        <div className='col m4 s12'>
                                            <p style={{color: grey600, marginTop: 0, marginBottom: 0}}>SIF: &nbsp; 
                                                <span style={{color: fullBlack}}>fds</span>
                                            </p>
                                        </div>
                                    )}
                                    {this.props.userCanSeeSIC === true && (
                                        <div className='col m4 s12'>
                                            <p style={{color: grey600, marginTop: 0, marginBottom: 0}}>SIC: &nbsp; 
                                                <span style={{color: fullBlack}}>fdsf</span>    
                                            </p>
                                        </div>
                                    )}
                                </div>
                            }
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px'}}
                            />
                            <CardText expandable={true}>
                                <div className='row'>
                                    <div className='col m3 s12'>
                                    </div>
                                    {this.props.userCanSeeSIF === true && (
                                        <div className='col m4 s12'>
                                            <SelectFieldCompanySIF 
                                                height={300} 
                                                showTitle={false}
                                                saveOnChange={false} />
                                        </div>
                                    )}
                                    {this.props.userCanSeeSIC === true && (
                                        <div className='col m4 s12'>
                                            <SelectFieldCompanySIC 
                                                height={300} 
                                                showTitle={false} 
                                                saveOnChange={false} />
                                        </div>
                                    )}
                                </div>
                                <div className='row'>
                                    <div className='col m3 s6 offset-m9 offset-s6'>
                                        <CardActions>
                                            {UserCompanyConfigurationActions}
                                        </CardActions>
                                    </div>
                                </div>
                            </CardText>
                    </Card>
                </div>
            )}
            {/*
            <AccessLog />
            */}
        </div>
    );
  }
}
export default Facultades;
