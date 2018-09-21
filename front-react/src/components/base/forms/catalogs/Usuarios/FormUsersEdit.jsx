/** END IMPORTES **/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as DialogsActions from 'actions/common/dialogs';
import {MenuItem, SelectField, TextField, Dialog, FlatButton} from "material-ui";
import * as ActionsSearchUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import {generaData} from "./utilUsers";

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
        objeto: store.catSearchUsuarios.objeto,
        usersList: generaData(store.catSearchUsuarios.data),
        dataNew: generaData(store.catSearchUsuarios.dataNew),
        userInfo: store.commonAuth
    };
})


class FormUsersEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idPersona:"",
            email:""
        };
        this.usuario= this.props.userInfo.userInfo.usuario;
        // Bind methods
        this.handleClose = this.handleClose.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);
    };
    componentWillReceiveProps(nextProps){
        
        if((this.state.idPersona=="" && this.state.email=="")||(nextProps.objeto!==this.props.objeto)){            
            this.setState({
                idPersona:nextProps.objeto.idPersona,
                email:nextProps.objeto.email,
            }) 
        }
    }
    _handleChange(event, newValue) {

        switch(event.target.name){
            case 'noEmpleado':
                this.setState({
                        idPersona: newValue.toUpperCase()
                    });

                break;
            case 'correoElectronico':
                this.setState({
                    email: newValue
                });
                break;
        }
    };
    handleClose = () => {
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));

    };
    _handleOnFormSubmit() {

        let userEdit=
                {
                    "claveUsuario" : this.props.objeto.claveUsuario,
                    "idPersona" : this.state.idPersona,
                    "email" : this.state.email,
                    "usuarioUltimaModificacion" : this.usuario
                };



        if (this.props.objeto.Edit){

            this.props.dispatch(ActionsSearchUsers.updateUser(userEdit,this.props.objeto,this.props.usersList));
        }else {

            this.props.dispatch(ActionsSearchUsers.updateUserNew(userEdit,this.props.objeto,this.props.dataNew));
        }
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));

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
        (this.state.idPersona!=="")&&
        (this.state.email!==""&&this.validaEmail(this.state.email)))?false:true;
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
        return (
            <div>
                <Dialog
                    title="Actualizar Usuario"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    open={this.props.dialogValidationEdith}
                >
                    <div className="row">
                        <div className="col m6 s6">
                            <TextField
                                hintText="No. Empleado"
                                floatingLabelText="No. Empleado*"
                                name='noEmpleado'
                                underlineFocusStyle={styles.underlineStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                defaultValue={this.state.idPersona}
                                onChange={this._handleChange}
                            />
                        </div>
                        <div className="col m6 s6">
                            <TextField
                                hintText="Correo electrónico"
                                floatingLabelText="Correo electrónico*"
                                name='correoElectronico'
                                underlineFocusStyle={styles.underlineStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                defaultValue={this.state.email}
                                onChange={this._handleChange}

                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default FormUsersEdit;