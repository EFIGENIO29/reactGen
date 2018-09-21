import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as DialogsActions from 'actions/common/dialogs';
import * as ActionsSearchModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';

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
        dialogValidationEdith: store.commonDialogs.validationEdith,
        data: store.catSearchModuls.data,
        objeto: store.catSearchModuls.objeto,
        dataNew: store.catNewModuls.dataNew,
        userInfo: store.commonAuth
    };
})


class FormModulsEdit extends Component {
    constructor(props) {
        super(props);
        this.usuarioAlta=this.props.userInfo.userInfo.usuario;
        // Bind methods
        this.handleClose = this.handleClose.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);
    }
    _handleChange(event, newValue) {

        switch(event.target.name){
            case 'nombreEdit':
                this.props.objeto.nombre = newValue;
                break;
            case 'descripcionEdit':
                this.props.objeto.descripcion = newValue;
                break;

        }
    }
    handleClose = () => {
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));
    };
    _handleOnFormSubmit() {

            this.props.objeto.usuarioUltimaModificacion =this.usuarioAlta
            this.props.dispatch(DialogsActions.updateDialogProgressOpen(true));
            this.props.dispatch(ActionsSearchModuls.actualizaModulo(this.props.objeto,this.props.data));
            this.props.dispatch(DialogsActions.updateValidationOpen(false));
            this.handleClose();
            this.props.dispatch(DialogsActions.updateDialogProgressOpen(false));
            this.props.dispatch(ActionsSearchModuls.catModulos());


    }
    render() {

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
                disabled={false}
                onTouchTap={this._handleOnFormSubmit}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Actualizar Módulo"
                    actions={actions}
                    modal={true}
                    open={this.props.dialogValidationEdith}
                >
                    <div className="row">
                        <div className="col m6 s6">
                            <TextField hintText="Nombre Módulo"
                                       name={'nombreEdit'}
                                       underlineFocusStyle={styles.underlineStyle}
                                       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                       defaultValue={this.props.objeto.nombre}
                                       underlineShow={false} floatingLabelText="Nombre"
                                       floatingLabelFixed={true}
                                       onChange={this._handleChange}
                            />
                        </div>
                        <div className="col m6 s6">
                            <TextField hintText="Descripción"
                                       underlineFocusStyle={styles.underlineStyle}
                                       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                       defaultValue={this.props.objeto.descripcion}
                                       name={'descripcionEdit'}
                                       multiLine={true}
                                       rows={1}
                                       underlineShow={false}
                                       floatingLabelText="Descripción"
                                       floatingLabelFixed={true}
                                       onChange={this._handleChange}
                            />
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    }
}

export default FormModulsEdit;