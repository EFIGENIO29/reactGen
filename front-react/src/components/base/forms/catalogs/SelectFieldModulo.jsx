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
        catalogModulo: store.commonConfiguration.catalogModulo
    };
})


/**
 * 
 */
class SelectFieldModulo extends Component {
    constructor(props) {
        super(props);
        // Component state
        this.state = {
            selectedOption: false,
            modulo: this.props.catalogModulo
        };
    }

    _handleSelectFieldOnChange = (event, index, value) => {
       this.props.dispatch(ConfigurationActions.updateCatalogoModulo(value));
        this.setState({
            selectedOption: true,
            company: value
        });
    }

    componentWillMount() {
    
        this.props.dispatch(ConfigurationActions.updateCatalogoModulo(null));
        let params = {
                
            };
            let config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_MODULOS, params, config)
            .then((response) => {
                const posts = response.data.payload;//response.data.payload.map(obj => obj.data);
                this.setState({ posts });
            })
            .catch(function(error) {
                console.log('error:', error);
            });
    }

    render() {

        return (
            
                <SelectField
                        floatingLabelText="Seleccionar Módulo"
                        onChange={this._handleSelectFieldOnChange}
                         value={this.state.company}
                        >
            
                            {_.sortBy(this.state.posts, (o) => { return o.text; }).map((element, index) => {
                                return  <MenuItem key={index} value={element.codigoModulo} primaryText={element.descripcion} />;
                            })}
                    </SelectField>    
                    
           
        );
    }
}

export default SelectFieldModulo;