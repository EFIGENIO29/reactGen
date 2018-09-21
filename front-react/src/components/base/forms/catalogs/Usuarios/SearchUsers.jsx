/**
 *
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/** Material-UI */
import {Paper, TextField, RaisedButton, AutoComplete, SelectField, MenuItem} from 'material-ui';
/** Redux actions */
import * as ActionsSearchUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import {generaCatalogo} from "./utilUsers";
/** Custom styles */

/** END IMPORTES **/
const styles2 = {

    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    customWidth: {
        width: 150,
    },
    button: {},
    dialog: {
        overflow: 'auto',
    },
    textField: {
        marginLeft: 20,
    }
};

const styles = {
    errorStyle: {
        color: "#E91E63",
    },
    underlineStyle: {
        borderColor: "#E91E63",
    },
    floatingLabelStyle: {
        color: "#E91E63",
    },
    floatingLabelFocusStyle: {
        color: "#E91E63",
    },
};
@connect((store) => {
    return {
        /** Dialogs */
        catalogoEmpresas: store.catSearchUsuarios.catalogEmpresas,
        catalogSucursales: store.catSearchUsuarios.catalogSucursales
    };
})

    /**
     *
     */
class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noEmpleado: "",
            nombre: "",
            aPaterno: "",
            aMaterno: "",
            usuario:"",
            empresa: "",
            sucursal: "",
            perfil: "",
            estatus: "A"
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
        this._handleUpdateEmpresa = this._handleUpdateEmpresa.bind(this);
        this._handleUpdateSucursal = this._handleUpdateSucursal.bind(this);
        this._handleUpdateEstatus = this._handleUpdateEstatus.bind(this);

    }

    _handleChange(event, newValue) {

        switch (event.target.name) {
            case 'noEmpleado':
                this.setState({
                    noEmpleado: newValue.toUpperCase()
                });
                break;
            case 'nombre':
                this.setState({
                    nombre: newValue.toUpperCase()
                });
                break;
            case 'aPaterno':
                this.setState({
                    aPaterno: newValue.toUpperCase()
                });
                break;
            case 'aMaterno':
                this.setState({
                    aMaterno: newValue.toUpperCase()
                });
                break;
            case 'usuario':
                this.setState({
                    usuario: newValue.toUpperCase()
                });
                break;
        }
    };
    _handleUpdateEmpresa = (event, index, value) => {

        this.setState({
            empresa: value
        });
        this.props.dispatch(ActionsSearchUsers.resetSucursal());
        this.props.dispatch(ActionsSearchUsers.catSucursales({
            "claveEmpresa": value
        }));
    };
    _handleUpdateSucursal = (event, index, value) => {
        this.setState({
            sucursal: value
        });
    };
    _handleUpdateEstatus = (event, index, value) => {
        this.setState({
            estatus: value
        });
    };
    _handleClick() {
        let campos={
            claveUsuario:(this.state.usuario==="")?null:this.state.usuario,
            noEmpleado: (this.state.noEmpleado==="")?null:this.state.noEmpleado,
            nombre: (this.state.nombre==="")?null:this.state.nombre,
            apePaterno: (this.state.aPaterno==="")?null:this.state.aPaterno,
            apeMaterno: (this.state.aMaterno==="")?null:this.state.aMaterno,
            empresa: (this.state.empresa==="")?null:this.state.empresa,
            sucursal: (this.state.sucursal==="")?null:this.state.sucursal,
            estatus: this.state.estatus
        };

        this.props.dispatch(ActionsSearchUsers.consultaUsuarios(campos));
    }
    _handleClickReset() {
        this.setState({
            noEmpleado: "",
            nombre: "",
            aPaterno: "",
            aMaterno: "",
            usuario:"",
            empresa: "",
            sucursal: "",
            estatus: "A"
        });
    }

    render() {
        let mostrar={"display":((this.state.noEmpleado!=="")||(this.state.nombre!=="")||(this.state.aPaterno!=="")||(this.state.aMaterno!=="")||(this.state.usuario!=="")||(this.state.empresa!=="")||(this.state.sucursal!==""))?"block":"none", width:"80%", float:"right"},
            banderaBoton=((this.state.noEmpleado!=="")||(this.state.nombre!=="")||(this.state.aPaterno!=="")||(this.state.aMaterno!=="")||(this.state.usuario!=="")||(this.state.empresa!=="")||(this.state.sucursal!==""))?false:true;
        let catEmpresas = [], catSucursales=[];
        if (this.props.catalogoEmpresas.length > 0) {

            this.props.catalogoEmpresas.map((item,index) => {

                catEmpresas.push(
                    <MenuItem key={index} value={item.claveEmpresa} primaryText={item.empresa} />
                );
            });
        }
        if (this.props.catalogSucursales.length > 0) {

            this.props.catalogSucursales.map((item,index) => {

                catSucursales.push(
                    <MenuItem key={index} value={item.claveSucursal} primaryText={item.sucursal} />
                );
            });
        }

        return (
            <div>
                <div className="row" >
                    <div className="col m3 s3">
                        <TextField
                            hintText="No. de empleado"
                            floatingLabelText="No. de empleado"
                            name='noEmpleado'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.noEmpleado}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            name='nombre'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombre}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Apellido paterno"
                            floatingLabelText="Apellido paterno"
                            name='aPaterno'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.aPaterno}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Apellido materno"
                            floatingLabelText="Apellido materno"
                            name='aMaterno'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.aMaterno}
                            onChange={this._handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col m3 s3">
                        <TextField
                            hintText="Usuario"
                            floatingLabelText="Usuario"
                            name='usuario'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.usuario}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Empresa"
                            value={this.state.empresa}
                            onChange={this._handleUpdateEmpresa}
                            name='empresa'
                        >
                            {catEmpresas}
                        </SelectField>
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Sucursal"
                            value={this.state.sucursal}
                            onChange={this._handleUpdateSucursal}
                            name='sucursal'
                        >
                            {catSucursales}
                        </SelectField>
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Estatus"
                            value={this.state.estatus}
                            onChange={this._handleUpdateEstatus}
                            name='estatus'
                        >
                            <MenuItem value={"A"} primaryText="Activo" />
                            <MenuItem value={"I"} primaryText="Inactivo" />
                        </SelectField>
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
                            primary={true}
                            label="BUSCAR"
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
export default SearchUsers;