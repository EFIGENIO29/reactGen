/**
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hasErrorsForm} from "../../../../../utils/validator";
/** Material-UI */
import {Paper, TextField, RaisedButton, MenuItem, SelectField} from 'material-ui';

/** Redux actions */
import * as ActionsAddUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import * as DialogsActions from 'actions/common/dialogs';
import {orange500, blue500} from 'material-ui/styles/colors';
/** Custom styles */

const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: "#E91E63",
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: "#E91E63",
    },
};

@connect((store) => {
    return {
        userInfo: store.commonAuth,
        dataNew: store.catSearchUsuarios.dataNew
    };
})
    /**
     *
     */
class NewsUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noEmpleado: "",
            correoElectronico: "",
            nombreUsuario: "",
            usuarioAlta: this.props.userInfo.userInfo.usuario
        };
        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
    }

    _handleChange(event, newValue) {

        let valueMayus=newValue.toUpperCase();
        switch(event.target.name){
            case 'noEmpleado':
                this.setState({
                    noEmpleado: valueMayus
                });
                break;
            case 'correoElectronico':
                this.setState({
                    correoElectronico: newValue
                });
                break;
            case 'nombreUsuario':
                this.setState({
                    nombreUsuario: valueMayus
                });
                break;
        }
    }
    _handleClick() {


        let datosUser={
            "idPersona": this.state.noEmpleado,
            "email": this.state.correoElectronico,
            "claveUsuario": this.state.nombreUsuario,
            "usuarioAlta": this.state.usuarioAlta
        };

        this.props.dispatch(ActionsAddUsers.agregarUser(datosUser, this.props.dataNew));
        this._handleClickReset();
    };
    _handleClickReset(){

        this.setState({
            noEmpleado: "",
            correoElectronico: "",
            nombreUsuario: ""
        });
    };
    validaEmail(valor){
        let banderaEmail=false, expre=/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (expre.test(valor)){
            banderaEmail=true;
        }
        return banderaEmail;

    }

    render() {

        let banderaBoton=(
            (this.state.noEmpleado!=="")&&
            (this.state.correoElectronico!==""&&this.validaEmail(this.state.correoElectronico))&&
            (this.state.nombreUsuario!==""))?false:true,
        mostrar={"display":(
            (this.state.noEmpleado!=="")||
            (this.state.correoElectronico!=="")||
            (this.state.nombreUsuario!=="")
        )?"block":"none", width:"80%", float:"right"};
        return (
            <div>
                <div className="row" style={{paddingLeft: 17}}>
                    <div className="col m4 s4">
                        <TextField
                            hintText="No. de empleado"
                            floatingLabelText="No. de empleado*"
                            name='noEmpleado'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.noEmpleado}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Correo electrónico"
                            floatingLabelText="Correo electrónico*"
                            name='correoElectronico'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.correoElectronico}
                            onChange={this._handleChange}

                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Nombre de Usuario"
                            floatingLabelText="Nombre de Usuario*"
                            name='nombreUsuario'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombreUsuario}
                            multiLine={true}
                            rows={1}
                            onChange={this._handleChange}

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s3 offset-s7">
                        <RaisedButton
                            type="submit"
                            label="LIMPIAR BUSQUEDA"
                            style={mostrar}
                            labelStyle={{color: "#2196F3"}}
                            onClick={this._handleClickReset}
                        />
                    </div>
                    <div className={"col"}>
                        <RaisedButton
                            type="submit"
                            label="REGISTRAR"
                            disabled={banderaBoton}
                            buttonStyle={{background: (!banderaBoton)?"#2196F3":"#E5E5E5"}}
                            labelStyle={{color: (!banderaBoton)?"#FFFFFF":"#A7A7A7"}}
                            onClick={this._handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default NewsUsers;