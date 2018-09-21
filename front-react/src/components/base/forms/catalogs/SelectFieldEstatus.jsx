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

import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
/** Redux actions */
import * as AuthActions from 'actions/common/auth';
import * as ConfigurationActions from 'actions/common/configuration';
/** Custom components */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AccessLog from 'components/base/layout/AccessLog';
/** Custom Constants */
import * as EndpointsConstants from 'constants/endpoints';
import axios from 'axios';


const style = {
    width: '100%',
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
};

@connect((store) => {
    return {
        catalogEstatus: store.commonConfiguration.catalogEstatus
    };
})


/**
 * 
 */
class SelectFieldEstatus extends Component {
    constructor(props) {
        super(props);
        // Component state
        this.state = {
            selectedOption: false,
            catalogEstatus: this.props.catalogEstatus
        };
    }

    _handleSelectFieldOnChange = (event, index, value) => {
       this.props.dispatch(ConfigurationActions.updateCatalogoEstatus(value));
        this.setState({
            selectedOption: true,
            catalogEstatus: value
        });
    }

    render() {
        
        return (
            
                <SelectField
                        floatingLabelText="Estatus"
                        onChange={this._handleSelectFieldOnChange}
                        value={this.state.catalogEstatus}
                        >
                           <MenuItem  value="A" primaryText="Activo" />
                           <MenuItem  value="I" primaryText="Inactivo" />
                </SelectField>    
           
        );
    }
}

export default SelectFieldEstatus;