/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** Material-UI */
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
/** Redux actions */
import * as LayoutActions from 'actions/common/layout';
import * as ConfigurationActions from 'actions/common/configuration';
import SelectFieldCompanySIF from 'components/base/forms/SelectFieldCompanySIF';
import SelectFieldCompanySIC from 'components/base/forms/SelectFieldCompanySIC';
import FlatButton from 'material-ui/FlatButton';
import {fullWhite, fullBlack, blue500, blue900, grey600} from 'material-ui/styles/colors';

/** Custom Constants */
import {selectOptionsSIF, selectOptionsSIC} from 'constants/configuration';
/** Custom styles */
const style = {
    margin: 12,
};
@connect((store) => {
    return {
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
class Configuration extends Component {
    constructor(props) {
        super(props);
        // 
        this.state = {
            open: false
        };
        // Bind methods
        this._handleSaveOnClik = this._handleSaveOnClik.bind(this);
        this._handleRequestClose = this._handleRequestClose.bind(this);
        this._handleResetOnClik = this._handleResetOnClik.bind(this);
        this._handleBlueOnClik = this._handleBlueOnClik.bind(this);
    }
    _handleSaveOnClik() {
        this.setState({
            open: true,
        });
    }
    _handleRequestClose() {
        this.setState({
            open: false,
        });
    }
    _handleResetOnClik() {
        this.props.dispatch(LayoutActions.resetHeaderBackgroundColor());
    }
    _handleBlueOnClik() {
        this.props.dispatch(LayoutActions.updateHeaderBackgroundColor('#0000FF'));
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
    _handleExpandChange = (expanded) => {
        this.setState({
            expanded: expanded
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
        const UserCompanyConfigurationShowCard = this.props.userCanSeeSIF === true || this.props.userCanSeeSIC === true;
        const UserCompanyConfigurationSIFSelected = _.find(selectOptionsSIF, (element) => { return element.value === this.props.companySIF; });
        const UserCompanyConfigurationSICSelected = _.find(selectOptionsSIC, (element) => { return element.value === this.props.companySIC; });
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
            <Paper>
                <div className='row'>
                    <div className='col m10'>
                        <h4>Configuración</h4>
                    </div>
                    <div className='col m2'>
                        <RaisedButton 
                            label="Guardar" 
                            primary={true} 
                            style={style}
                            onTouchTap={this._handleSaveOnClik} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col m12'>
                        <Card>
                            <CardHeader
                            title="Tema"
                            subtitle="Color y logo de la aplicación"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <div className='row'>
                                    <div className='col m6'>
                                        <RaisedButton 
                                            label="Financiera Independencia" 
                                            secondary={true} 
                                            style={style}
                                            onTouchTap={this._handleResetOnClik} />
                                    </div>
                                    <div className='col m6'>
                                        <RaisedButton 
                                            label="Mas Nomina" 
                                            primary={true} 
                                            style={style}
                                            onTouchTap={this._handleBlueOnClik} />
                                    </div>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                </div>
                    <div className='row'>
                        <div className='col m12'>
                            {UserCompanyConfigurationShowCard === true && (
                               
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
                                                                <span style={{color: fullBlack}}>{UserCompanyConfigurationSIFSelected.text}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                    {this.props.userCanSeeSIC === true && (
                                                        <div className='col m4 s12'>
                                                            <p style={{color: grey600, marginTop: 0, marginBottom: 0}}>SIC: &nbsp; 
                                                                <span style={{color: fullBlack}}>{UserCompanyConfigurationSICSelected.text}</span>    
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
                               
                            )}
                        </div>
                    </div>                        
             
                <Snackbar
                    open={this.state.open}
                    message="Se ha guardado la información"
                    autoHideDuration={4000}
                    onRequestClose={this._handleRequestClose}
                    />
            </Paper>
        );
    }
}
export default Configuration;
