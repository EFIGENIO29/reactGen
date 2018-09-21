/**
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Material-UI */
import { Paper, TextField, RaisedButton } from 'material-ui';

/** Redux actions */
import * as ActionsSearchModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';
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
},styleBoton={paddingLeft: 56};

@connect((store) => {
    return {
        userInfo: store.commonAuth,
        dataNew: store.catNewModuls.dataNew
    };
})
    /**
     *
     */
class NewsModuls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoModuloNews: "",
            nombreNews: "",
            descripcionNews: "",
            banderaBoton: true,
            usuarioAlta: this.props.userInfo.userInfo.usuario
        };
        this.mostrar= {display: ((this.state.nombreNews!=="")||(this.state.codigoModuloNews!=="")||(this.state.descripcionNews!==""))?"none":"block"};
        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
    }

    _handleChange(event, newValue) {
        newValue=newValue.toUpperCase();
        switch(event.target.name){
            case 'codigoModuloNews':
                this.setState({
                    codigoModuloNews: newValue
                });
                break;
            case 'nombreNews':
                this.setState({
                    nombreNews: newValue
                });
                break;
            case 'descripcionNews':
                this.setState({
                    descripcionNews: newValue
                });
                break;
        }
    }
    _handleClick() {
        if((this.state.nombreNews!=="")&&(this.state.codigoModuloNews!=="")&&(this.state.descripcionNews!=="")){
            let datosAdd={
                "codigoModulo": this.state.codigoModuloNews,
                "nombre": this.state.nombreNews,
                "descripcion": this.state.descripcionNews,
                "usuarioAlta": this.state.usuarioAlta
            };
            this.props.dispatch(ActionsSearchModuls.agregaModulo(datosAdd, this.props.dataNew));
            this._handleClickReset();
            this.props.dispatch(ActionsSearchModuls.catModulos());
        }else{

            this.props.dispatch(DialogsActions.updateErrorTitle('Error'));
            this.props.dispatch(DialogsActions.updateErrorMsg('Digite [Nombre, Codigo y Descripción]' ));
            this.props.dispatch(DialogsActions.updateErrorOpen(true));

        }
    };
    _handleClickReset(){

        this.setState({
            codigoModuloNews: "",
            nombreNews: "",
            descripcionNews: "",
            banderaBoton: true
        });
    };

    render() {
        let banderaBoton=(!((this.state.nombreNews !== "")&&(this.state.descripcionNews !== "")&&(this.state.codigoModuloNews !== ""))),
            mostrar={paddingLeft: 56, "display":((this.state.nombreNews!=="")||(this.state.codigoModuloNews!=="")||(this.state.descripcionNews!==""))?"block":"none"},
            classBoton=((this.state.nombreNews!=="")||(this.state.codigoModuloNews!=="")||(this.state.descripcionNews!==""))?"col s2 push-s8" :"col s2 push-s8 offset-s2";
        return (
            <div>
                <div className="row" style={{paddingLeft: 17}}>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Nombre"
                            floatingLabelText="Nombre*"
                            name='nombreNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.nombreNews}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Código"
                            floatingLabelText="Código*"
                            name='codigoModuloNews'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.codigoModuloNews}
                            onChange={this._handleChange}

                        />
                    </div>
                    <div className="col m4 s4">
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
                </div>
                <div className="row">
                    <div className="col s2 push-s8" style={mostrar}>
                        <RaisedButton
                            type="submit"
                            label="LIMPIAR DATOS"
                            labelStyle={{color: "#2196F3"}}
                            onClick={this._handleClickReset}
                        />
                    </div>
                    <div className={classBoton}>
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
export default NewsModuls;