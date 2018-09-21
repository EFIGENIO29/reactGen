import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as DialogsActions from 'actions/common/dialogs';
import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';

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
       index: store.catSearchProfiles.index,
       objeto: store.catSearchProfiles.objeto 
    };
})


class FormProfilesEdith extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            codigoPerfilUPDATE: props.objeto.codigoPerfil,
            nombrePerfilUPDATE:props.objeto.nombre,
            descripcionPerfilUPDATE:props.objeto.descripcion
        }        
        // Bind methods
        this.handleClose = this.handleClose.bind(this);
        this._handleChange = this._handleChange.bind(this);    
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);    
    }
    componentWillUpdate(nextProps, nextState){
          
        if(nextState.nombrePerfilUPDATE!==this.state.nombrePerfilUPDATE||nextState.descripcionPerfilUPDATE!==this.state.descripcionPerfilUPDATE){
            
            this.setState({                    
                nombrePerfilUPDATE: nextState.nombrePerfilUPDATE,
                descripcionPerfilUPDATE: nextState.descripcionPerfilUPDATE
            }) 
        }

    }
    componentWillReceiveProps(nextProps){

        if(((nextProps.objeto.descripcion!=""||nextProps.objeto.nombre!="")&&(this.state.nombrePerfilUPDATE!==nextProps.objeto.nombre||this.state.descripcionPerfilUPDATE!==nextProps.objeto.descripcion))){
            this.setState({
                codigoPerfilUPDATE: nextProps.objeto.codigoPerfil,
                nombrePerfilUPDATE: nextProps.objeto.nombre,
                descripcionPerfilUPDATE: nextProps.objeto.descripcion
            }) 
        }
    }; 
    
    _handleChange(event, newValue) {               
        switch(event.target.name){            
            case 'nombrePerfilEdit':    
                this.setState({
                    nombrePerfilUPDATE: newValue.toUpperCase()
                })
            break;
            case 'descripcionPerfilEdit':    
                this.setState({
                    descripcionPerfilUPDATE: newValue.toUpperCase()
                })                
            break;

        }        
    }
    handleClose = () => {
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(false));        
    };
    _handleOnFormSubmit() {
        
        let objEdit = [];
        objEdit = this.props.objeto;
        objEdit.descripcion = this.state.descripcionPerfilUPDATE;
        objEdit.nombre = this.state.nombrePerfilUPDATE;
        this.props.dispatch(ActionsSearchPerfiles.updateObject(objEdit));                

        this.props.dispatch(DialogsActions.updateDialogProgressOpen(true));
        this.props.dispatch(ActionsSearchPerfiles.actualizaPerfiles(this.props.objeto,this.props.index,objEdit));                                        
        this.props.dispatch(DialogsActions.updateValidationOpen(false));   
        this.handleClose();        
        this.props.dispatch(DialogsActions.updateDialogProgressOpen(false));
        
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
                label="Enviar"
                primary={true}
                disabled={false}
                onTouchTap={this._handleOnFormSubmit}
            />,
        ];
        
        return ( 
            <div>
            <Dialog
                title="Actualizar Perfil"                
                actions={actions}
                modal={true}
                open={this.props.dialogValidationEdith}
            >                
                                 
                <div className="row">
                    <div className="col m6 s6">
                        <TextField 
                            hintText="Nombre Perfil" 
                            name={'nombrePerfilEdit'}                            
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}                            
                            value={this.state.nombrePerfilUPDATE}
                            underlineShow={false} 
                            floatingLabelText="Nombre"
                            floatingLabelFixed={true}
                            onChange={this._handleChange}
                        />
                    </div> 
                    <div className="col m6 s6">
                        <TextField 
                            hintText="Descripción Perfil" 
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}                            
                            name={'descripcionPerfilEdit'}
                            multiLine={true}
                            rows={1}
                            underlineShow={false}
                            floatingLabelText="Descripción"
                            floatingLabelFixed={true}                            
                            value={this.state.descripcionPerfilUPDATE}                                                        
                            onChange={this._handleChange}
                        />
                    </div>                
                </div>                    
                
            </Dialog>
            </div>
        );
    }
}
 
export default FormProfilesEdith;