/** END IMPORTES **/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as DialogsActions from 'actions/common/dialogs';
import {MenuItem, SelectField, TextField, Dialog, FlatButton} from "material-ui";
import * as ActionsAddFacultad from 'actions/forms/catalogs/facultades/SearchFacultadesActions';
import {generaData} from "./utilsFacultades";

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
const customContentStyle = {
    width: '100%',
    maxWidth: '95%'
};
@connect((store) => {
    return {
        dialogValidationEdith: store.commonDialogs.validationEdith,
        objeto: store.catSearchFacultades.objeto,
        modulsList: store.catSearchModuls.catalogos,
        catMenuP: store.catMenuP.dataCP,
        catMenuLTWO: store.catMenuP.dataLTWO,
        catMenuLTREE: store.catMenuP.dataLTREE,
        arbolMenu: store.menuArbol.arbolMenu,
        userInfo: store.commonAuth,
        facultadesList: generaData(store.catSearchFacultades.data, ""),
        facultadesListNew: generaData(store.catSearchFacultades.dataNew, "nuevo")
    };
})


class FormFacultadEdit extends Component {
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
            cuartoNivel: "levelFour",
            nombreNews: "",
            nombre1News: "",
            banderaBoton: true,
            banderaControl: false
        };
        this.objeto={};
        this.principal={display:"none"};
        this.segundo={display:"none"};
        this.tercero={display:"none"};
        this.cuarto={display:"none"};
        this.muestraCampo={display:"none"};
        this.muestraCampo2={display:"none"};
        this.codigoMenuUp="";
        this.opcionPadre="";
        this.usuario= this.props.userInfo.userInfo.usuario;
        // Bind methods
        this.handleClose = this.handleClose.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdateTipoFacultad = this._handleUpdateTipoFacultad.bind(this);
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);
    };
    componentWillReceiveProps(nextProps){

        if (nextProps.objeto!==this.props.objeto||nextProps.arbolMenu!==this.props.arbolMenu){

             this.muestraCampos(nextProps.arbolMenu, nextProps.objeto);
        }
    };
    _handleChange(event, newValue) {

        switch(event.target.name){
            case 'nombreFacultadNews':
                this.setState({
                    nombreFacultadNews: newValue
                });
                break;
            case 'codigoFacultadNews':
                this.setState({
                    codigoFacultadNews: newValue
                });
                break;
            case 'descripcionNews':
                this.setState({
                    descripcionNews: newValue
                });
                break;
            case 'urlNews':
                this.setState({
                    urlNews: newValue
                });
                break;
            case 'nombreNews':
                this.setState({
                    nombreNews: newValue
                });
                break;
            case 'nombre1News':
                this.setState({
                    nombre1News: newValue
                });
                break;
        }
    };
    _handleUpdateTipoFacultad(event, index, newValue) {

        if (newValue==="FPANT"){
            this.principal={display:"block"};
        }else{
            this.ocultaCampos("boton","");
        };
        this.setState({
            tipoFacultad: newValue
        });
    };
    _handleUpdateModulo = (event, index, value) => {

        this.setState({
            nombreModulo: event.target.innerText,
            modulo: value
        });
    };
    _handleNivelPrincipal = (event, index, value) => {

        this.ocultaCampos("nivelPrincipal",value);
        this.codPadre="NULL_PADRE";
        if (value==="levelOne"){


            this.muestraCampo={display:"block"};
        }else {

            this.segundo={display:"block"};
            this.props.dispatch(ActionsAddFacultad.consultaMenus(value,"levelTwo"));
        }
    };
    _handleUpdatesegundoNivel = (event, index, value) => {

        this.ocultaCampos("segundoNivel",value);
        this.codPadre=this.state.nivelPrincipal;
        if (value==="levelTwo"){

            this.muestraCampo={display:"block"};
        }else {

            this.tercero={display:"block"};
            this.props.dispatch(ActionsAddFacultad.consultaMenus(value,"levelTree"));
        }
    };
    _handleUpdateTercerNivel = (event, index, value) => {
        this.ocultaCampos("tercerNivel",value);
        this.codPadre=this.state.segundoNivel;
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
        this.codPadre=this.state.tercerNivel;
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
    handleClose = () => {
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));
        this.setState({
            banderaControl:false
        });
    };
    _handleOnFormSubmit() {

        let facultadEdit=
         {
         "codigoFacultad" : this.props.objeto.codigoFacultad,
         "usuarioUltimaModificacion" : this.usuario,
         "descripcion" : this.state.descripcionNews,
         "nombre" : this.state.nombreFacultadNews,
         "modulo":{"codigoModulo":this.state.modulo},
         "tipoFacultad" : this.state.tipoFacultad,
         "nombreModulo":this.state.nombreModulo},

        menuEdit=
         {
         "codigoMenu" : this.codigoMenuUp,
         "usuarioUltimaModificacion" : this.usuario,
         "codigoPadre" : this.codPadre,
         "nombre" : (this.state.nombre1News!=="")?this.state.nombre1News:this.state.nombreNews,
         "url" : this.state.urlNews
         };

        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));

        if (this.props.objeto.Edit){

            this.props.dispatch(ActionsAddFacultad.updateFacultad(facultadEdit,this.props.objeto,this.props.facultadesList,menuEdit));
        }else {

            this.props.dispatch(ActionsAddFacultad.updateFacultadNew(facultadEdit,this.props.objeto,this.props.facultadesListNew,menuEdit));
        }
        this.setState({
            banderaControl:false
        });

    };
    validaCampos(){

        if (this.state.nombreFacultadNews !== ""&&
            this.state.codigoFacultadNews !== ""&&
            this.state.descripcionNews !== ""&&
            this.state.modulo !== ""){

            if (this.state.tipoFacultad !==""){
                if (this.state.tipoFacultad ==="FPANT"){
                    this.principal={display:"block"};
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
                    this.principal = {display: "none"};
                    return false
                }
            }else{
                return true
            }
        }else{
            return true
        }
    };
    muestraCampos(menuData, objeto){

        let nombreNews_up = "",
            nombre1News_up = "";
        console.log("menuData",menuData);
        if ((this.props.objeto.tipoFacultad==="Menú") && menuData !== null){
            if (Object.keys(menuData).length !== 0) {

                this.principal = {display: "block"};

                nombreNews_up = menuData.nombre;
                this.codigoMenuUp = menuData.codigoMenu;
                this._handleNivelPrincipal("", "", (menuData.menu !== null) ? menuData.codigoMenu : "levelOne");
                if (menuData.menu !== null) {
                    this.segundo = {display: "block"};
                    this._handleUpdatesegundoNivel("", "", (menuData.menu.menu !== null) ? menuData.menu.codigoMenu : "levelTwo");

                    nombreNews_up = menuData.menu.nombre;
                    this.codigoMenuUp = menuData.menu.codigoMenu;
                    if (menuData.menu.menu !== null) {
                        this.tercero = {display: "block"};
                        this._handleUpdateTercerNivel("", "", (menuData.menu.menu.menu !== null) ? menuData.menu.menu.codigoMenu : "levelTree");

                        nombre1News_up = menuData.menu.menu.nombre;
                        this.codigoMenuUp = menuData.menu.menu.codigoMenu;
                        if (menuData.menu.menu.menu !== null) {
                            this.cuarto = {display: "block"};
                            this._handleUpdateCuartoNivel("", "", "levelFour");
                            nombre1News_up = menuData.menu.menu.menu.nombre;
                            this.codigoMenuUp = menuData.menu.menu.menu.codigoMenu;
                        }
                    }
                }
            }
            this.setState({
                nombreNews: nombreNews_up,
                nombre1News: nombre1News_up,
                nombreFacultadNews: (objeto)?objeto.nombre:"",
                codigoFacultadNews: (objeto)?objeto.codigoFacultad:"",
                descripcionNews: (objeto)?objeto.descripcion:"",
                modulo: (objeto.modulo)?objeto.modulo.codigoModulo:"",
                nombreModulo: (objeto.modulo)?objeto.nombreModulo:"",
                tipoFacultad: (objeto.tipoFacultad==="Menú")?"FPANT":"FBTN",
                urlNews: (objeto)?objeto.url:""
            })
        }else if (this.props.objeto.tipoFacultad==="Botón"&&!this.state.banderaControl){
            this.setState({

                nombreFacultadNews: (objeto)?objeto.nombre:"",
                codigoFacultadNews: (objeto)?objeto.codigoFacultad:"",
                descripcionNews: (objeto)?objeto.descripcion:"",
                modulo: (objeto.modulo)?objeto.modulo.codigoModulo:"",
                tipoFacultad: (objeto.tipoFacultad==="Menú")?"FPANT":"FBTN",
                banderaControl:true
            });
            this.principal = {display: "none"};
        }
    };
    render() {

        let banderaBoton=this.validaCampos(),
            array = [], arraycatMP=[], arraycatLTWO=[], arraycatLTREE=[];
        const actions = [
            <FlatButton
                label="Cancelar"
                secondary={true}
                onTouchTap={this.handleClose}
                labelStyle={{color:"#000000"}}
            />,
            <FlatButton
                label="Guardar"
                primary={true}
                disabled={banderaBoton}
                onTouchTap={this._handleOnFormSubmit}
            />,
        ];
        this.props.modulsList.map((item,index) => {

            array.push(
                <MenuItem key={index} value={item.codigoModulo} primaryText={item.nombre} />
            );
        });

        this.props.catMenuP.map((item,index) => {
            arraycatMP.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });

        this.props.catMenuLTWO.map((item,index) => {
            arraycatLTWO.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });

        this.props.catMenuLTREE.map((item,index) => {
            arraycatLTREE.push(
                <MenuItem key={index} value={item.codigoMenu} primaryText={item.nombre} />
            );
        });

        return (
            <div>
                <Dialog
                    title="Actualizar Facultad"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    open={this.props.dialogValidationEdith}
                >
                    <div className="row">
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
                                disabled={true}
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
                                disabled={true}
                                name='moduloNews'
                            >
                                {array}
                            </SelectField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m3 s3">
                            <SelectField
                                floatingLabelText="Tipo de Facultad*"
                                value={this.state.tipoFacultad}
                                onChange={this._handleUpdateTipoFacultad}
                                disabled={true}
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
                    <div className="row" >
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

                </Dialog>
            </div>
        );
    }
}

export default FormFacultadEdit;