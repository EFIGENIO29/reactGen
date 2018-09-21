/**
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hasErrorsForm} from "../../../../../utils/validator";
/** Material-UI */
import {Paper, TextField, RaisedButton, MenuItem, SelectField} from 'material-ui';

/** Redux actions */
import * as ActionsAddFacultad from 'actions/forms/catalogs/facultades/SearchFacultadesActions';
import {converCat} from "./utilsFacultades";
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
        modulsList: store.catSearchModuls.catalogos,
        userInfo: store.commonAuth,
        dataNew: store.catFacultades.dataNew,
        catMenuP: store.catMenuP.dataCP,
        catMenuLTWO: store.catMenuP.dataLTWO,
        catMenuLTREE: store.catMenuP.dataLTREE
    };
})
    /**
     *
     */
class NewFacultades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreFacultadNews: "",
            codigoFacultadNews: "",
            descripcionNews: "",
            modulo: "",
            nombreModulo: "",
            tipoFacultad: "",
            urlNews: "",
            nivelPrincipal: "",
            segundoNivel: "",
            tercerNivel: "",
            cuartoNivel: "",
            nombreNews: "",
            nombre1News: "",
            banderaBoton: true,
            usuarioAlta: this.props.userInfo.userInfo.usuario
        };
        this.mostrar= {display: ((this.state.nombreNews!=="")||(this.state.codigoFacultadNews!=="")||(this.state.descripcionNews!==""))?"none":"block"};
        this.principal={display:"none"};
        this.segundo={display:"none"};
        this.tercero={display:"none"};
        this.cuarto={display:"none"};
        this.muestraCampo={display:"none"};
        this.muestraCampo2={display:"none"};
        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdateTipoFacultad = this._handleUpdateTipoFacultad.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
    }

    _handleChange(event, newValue) {

        let valueMayus=newValue.toUpperCase();
        switch(event.target.name){
            case 'nombreFacultadNews':
                this.setState({
                    nombreFacultadNews: valueMayus
                });
                break;
            case 'codigoFacultadNews':
                this.setState({
                    codigoFacultadNews: valueMayus
                });
                break;
            case 'descripcionNews':
                this.setState({
                    descripcionNews: valueMayus
                });
                break;
            case 'urlNews':
                this.setState({
                    urlNews: newValue
                });
                break;
            case 'nombreNews':
                this.setState({
                    nombreNews: valueMayus
                });
                break;
            case 'nombre1News':
                this.setState({
                    nombre1News: valueMayus
                });
                break;
        }
    }
    _handleUpdateTipoFacultad(event, index, newValue) {

        if (newValue==="FPANT"){
            this.principal={display:"block"};
        }else{
            this.ocultaCampos("boton","");
        };
        this.setState({
            tipoFacultad: newValue
        });
    }
    _handleClick() {

        let codPadre="";
        if (this.state.cuartoNivel!==""){

            codPadre=this.state.tercerNivel;
        }else if (this.state.tercerNivel!==""){

            codPadre=this.state.segundoNivel;
        }else if (this.state.segundoNivel!==""){

            codPadre=this.state.nivelPrincipal;
        }

        let datosFacultad={
            "codigoFacultad": this.state.codigoFacultadNews,
            "nombre": this.state.nombreFacultadNews,
            "descripcion": this.state.descripcionNews,
            "modulo": {"codigoModulo" : this.state.modulo},
            "nombreModulo": this.state.nombreModulo,
            "tipoFacultad": this.state.tipoFacultad,
            "usuarioAlta": this.state.usuarioAlta
        },datosMenu={
            "codigoMenu": this.state.codigoFacultadNews,
            "descripcion":(this.state.nombreNews!=="")?this.state.nombreNews:this.state.nombre1News,
            "codigoModulo": this.state.modulo,
            "nombre": (this.state.nombreNews!=="")?this.state.nombreNews:this.state.nombre1News,
            "url" : this.state.urlNews,
            "usuarioAlta": this.state.usuarioAlta,
            "codigoPadre" : codPadre
        },datosFacultadMenu={
            "codigoMenu": this.state.codigoFacultadNews,
            "codigoFacultad": this.state.codigoFacultadNews,
            "usuarioAlta":this.state.usuarioAlta
        };
        this.props.dispatch(ActionsAddFacultad.agregaFacultad(datosFacultad, datosMenu, datosFacultadMenu, this.props.dataNew));
        this._handleClickReset();
    };
    _handleClickReset(){

        this.ocultaCampos("boton","");

        this.setState({
            nombreFacultadNews: "",
            codigoFacultadNews: "",
            descripcionNews: "",
            modulo: "",
            nombreModulo:"",
            tipoFacultad: "",
            banderaBoton: true
        });
    };

    _handleUpdateModulo = (event, index, value) => {

            this.setState({
                nombreModulo: event.target.innerText,
                modulo: value
            });

        this.props.dispatch(ActionsAddFacultad.consultaMenuPrincipal(value));

    };
    _handleNivelPrincipal = (event, index, value) => {

        this.ocultaCampos("nivelPrincipal",value);
        if (value==="levelOne"){

            this.muestraCampo={display:"block"};

        }else {

            this.segundo={display:"block"};
            this.props.dispatch(ActionsAddFacultad.consultaMenus(value,"levelTwo"));
        }
    };
    _handleUpdatesegundoNivel = (event, index, value) => {

        this.ocultaCampos("segundoNivel",value);
        if (value==="levelTwo"){

            this.muestraCampo={display:"block"};
        }else {

            this.tercero={display:"block"};
            this.props.dispatch(ActionsAddFacultad.consultaMenus(value,"levelTree"));
        }
    };
    _handleUpdateTercerNivel = (event, index, value) => {

        this.ocultaCampos("tercerNivel",value);
        if (value==="levelTree"){

            this.muestraCampo2={display:"block"};
        }else {

            this.cuarto={display:"block"};
            this.props.dispatch(ActionsAddFacultad.consultaMenus(value,"levelFour"));
        }
    };
    _handleUpdateCuartoNivel = (event, index, value) => {

        this.ocultaCampos("cuartoNivel",value);
        this.muestraCampo2={display:"block"};

    };
    ocultaCampos(opcion,value){

        switch (opcion){
            case 'boton':
                this.principal={display:"none"};
                this.segundo={display:"none"};
                this.tercero={display:"none"};
                this.cuarto={display:"none"};
                this.muestraCampo={display:"none"};
                this.muestraCampo2={display:"none"};
                this.setState({
                    urlNews: "",
                    nivelPrincipal:"",
                    segundoNivel:"",
                    tercerNivel:"",
                    cuartoNivel:"",
                    nombreNews: "",
                    nombre1News: ""
                });
                break;
            case 'nivelPrincipal':
                this.segundo={display:"none"};
                this.tercero={display:"none"};
                this.cuarto={display:"none"};
                this.muestraCampo={display:"none"};
                this.muestraCampo2={display:"none"};
                this.setState({
                    nivelPrincipal:value,
                    segundoNivel:"",
                    tercerNivel:"",
                    cuartoNivel:"",
                    nombreNews: "",
                    nombre1News: ""
                });
                break;
            case 'segundoNivel':
                this.tercero={display:"none"};
                this.cuarto={display:"none"};
                this.muestraCampo={display:"none"};
                this.muestraCampo2={display:"none"};
                this.setState({
                    segundoNivel:value,
                    tercerNivel:"",
                    cuartoNivel:"",
                    nombreNews: "",
                    nombre1News: ""
                });
                break;
            case 'tercerNivel':
                this.cuarto={display:"none"};
                this.muestraCampo={display:"none"};
                this.muestraCampo2={display:"none"};
                this.setState({
                    tercerNivel:value,
                    cuartoNivel:"",
                    nombreNews: "",
                    nombre1News: ""
                });
                break;
            case 'cuartoNivel':
                this.muestraCampo2={display:"none"};
                this.setState({
                    cuartoNivel:value,
                    nombre1News: ""
                });
                break;
        }
    };
    validaCampos(){

        if (this.state.nombreFacultadNews !== ""&&
            this.state.codigoFacultadNews !== ""&&
            this.state.descripcionNews !== ""&&
            this.state.modulo !== ""){
            if (this.state.tipoFacultad !==""){
                if (this.state.tipoFacultad ==="FPANT"){
                    if(this.state.nivelPrincipal==="levelOne"&&this.state.nombreNews!==""){
                        return false
                    }else if (this.state.nivelPrincipal!==""&&this.state.nivelPrincipal!=="levelOne"){
                        if (this.state.segundoNivel==="levelTwo"&&this.state.nombreNews!==""){
                            return false
                        }else if (this.state.segundoNivel!=="levelTwo"&&this.state.segundoNivel!==""){
                            if (this.state.tercerNivel==="levelTree"&&this.state.nombre1News!==""){
                                return false
                            }else if (this.state.tercerNivel!==""&&this.state.tercerNivel!=="levelTree"){
                                if (this.state.cuartoNivel==="levelFour"&&this.state.nombre1News!==""){
                                    return false
                                }else{
                                    return true
                                }
                            }else{
                                return true
                            }
                        }else{
                            return true
                        }
                    }else{
                        return true
                    }
                }else {
                    return false
                }
            }else{
                return true
            }
        }else{
            return true
        }
    };

    render() {

        let banderaBoton=this.validaCampos(),
            mostrar={"display":((this.state.nombreFacultadNews!=="")||(this.state.codigoFacultadNews!=="")||(this.state.descripcionNews!=="")||(this.state.modulo!=="")||(this.state.tipoFacultad!==""))?"block":"none", width:"80%", float:"right"},
            array = [];
        if (this.props.modulsList.length > 0) {

            this.props.modulsList.map((item,index) => {

                array.push(
                    <MenuItem key={index} value={item.codigoModulo} primaryText={item.nombre} />
                );
            });
        };

        let arraycatMP=[];
        this.props.catMenuP.map((item,index) => {
            arraycatMP.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });
        let arraycatLTWO=[];
        this.props.catMenuLTWO.map((item,index) => {
            arraycatLTWO.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });
        let arraycatLTREE=[];
        this.props.catMenuLTREE.map((item,index) => {
            arraycatLTREE.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });

        return (
            <div>
                <div className="row" style={{paddingLeft: 17}}>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Nombre de la facultad"
                            floatingLabelText="Nombre de la facultad*"
                            name='nombreFacultadNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombreFacultadNews}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Código"
                            floatingLabelText="Código*"
                            name='codigoFacultadNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.codigoFacultadNews}
                            onChange={this._handleChange}

                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Descripción"
                            floatingLabelText="Descripción*"
                            name='descripcionNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.descripcionNews}
                            multiLine={true}
                            rows={1}
                            onChange={this._handleChange}

                        />
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Módulo*"
                            value={this.state.modulo}
                            onChange={this._handleUpdateModulo}
                            name='moduloNews'
                        >
                            {array}
                        </SelectField>
                    </div>
                </div>
                <div className="row" style={{paddingLeft: 17}}>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Tipo de Facultad*"
                            value={this.state.tipoFacultad}
                            onChange={this._handleUpdateTipoFacultad}
                            name='tipoFacultadNews'
                        >
                            <MenuItem value={"FPANT"} primaryText="Menú" />
                            <MenuItem value={"FBTN"} primaryText="Botón" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3" style={this.principal}>
                        <TextField
                            hintText="URL"
                            floatingLabelText="URL"
                            name='urlNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.urlNews}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3" style={this.principal}>
                        <SelectField
                            floatingLabelText="Nivel principal*"
                            value={this.state.nivelPrincipal}
                            onChange={this._handleNivelPrincipal}
                            name='nivelPrincipal'
                            id='nivelPrincipal'
                        >

                            {arraycatMP}
                            <MenuItem key={"level1"} value={"levelOne"} primaryText="Crear nueva opción aquí" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3" style={this.segundo}>
                        <SelectField
                            floatingLabelText="Segundo nivel*"
                            value={this.state.segundoNivel}
                            onChange={this._handleUpdatesegundoNivel}
                            id='segundoNivel'
                        >
                            {arraycatLTWO}
                            <MenuItem value={"levelTwo"} primaryText="Crear nueva opción aquí" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3" style={this.muestraCampo}>
                        <TextField
                            hintText="nombre"
                            floatingLabelText="Nombre*"
                            name='nombreNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombreNews}
                            onChange={this._handleChange}

                        />
                    </div>
                </div>
                <div className="row" style={{paddingLeft: 17}}>
                    <div className="col m3 s3" style={this.tercero}>
                        <SelectField
                            floatingLabelText="Tercer Nivel*"
                            value={this.state.tercerNivel}
                            onChange={this._handleUpdateTercerNivel}
                            name='tercerNivel'
                        >

                            {arraycatLTREE}
                            <MenuItem value={"levelTree"} primaryText="Crear nueva opción aquí" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3" style={this.cuarto}>
                        <SelectField
                            floatingLabelText="Cuarto nivel*"
                            value={this.state.cuartoNivel}
                            onChange={this._handleUpdateCuartoNivel}
                            name='cuartoNivel'
                        >
                            <MenuItem value={"levelFour"} primaryText="Crear nueva opción aquí" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3" style={this.muestraCampo2}>
                        <TextField
                            hintText="nombre"
                            floatingLabelText="Nombre*"
                            name='nombre1News'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombre1News}
                            onChange={this._handleChange}

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s3 offset-s7">
                        <RaisedButton
                            type="submit"
                            label="LIMPIAR DATOS"
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
export default NewFacultades;