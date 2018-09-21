/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Material-UI */
import { Paper, TextField, RaisedButton } from 'material-ui';

/** Redux actions */
 import * as ActionsPerfilesNews from 'actions/forms/catalogs/perfiles/Newsprofiles';
 import * as DialogsActions from 'actions/common/dialogs';
 import {orange500, blue500} from 'material-ui/styles/colors';
 import Notification from 'components/base/generic/Notifications/Notification';
/** Custom styles */

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
        register_objeto: store.catNewProfiles.objeto
    };
})
/**
 * 
 */
class Newsprofiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoPerfilNews: "",
            nombreNews:"",
            descripcionNews:"",
            habilitaRegistro:true
        }
        
        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
    }
     
    _handleChange(event, newValue) {
        
        switch(event.target.name){
            case 'codigoPerfilNews':    
                this.setState({
                    codigoPerfilNews: newValue.toUpperCase(),
                    habilitaRegistro:((this.state.nombreNews!=="")&&(this.state.descripcionNews!=="")&&(this.state.codigoPerfilNews!==""))?false:true
                })
            break;
            case 'nombreNews':    
                this.setState({
                    nombreNews: newValue.toUpperCase(),
                    habilitaRegistro:((this.state.nombreNews!=="")&&(this.state.descripcionNews!=="")&&(this.state.codigoPerfilNews!==""))?false:true
                })
            break;
            case 'descripcionNews':    
                this.setState({
                    descripcionNews: newValue.toUpperCase(),
                    habilitaRegistro:((this.state.nombreNews!=="")&&(this.state.descripcionNews!=="")&&(this.state.codigoPerfilNews!==""))?false:true
                })
            break;
        }        
    }
    _handleClick() {
        if((this.state.codigoPerfilNews!="")&&(this.state.nombresNews!="")&&(this.state.descripcionNews!="")){
            this.props.dispatch(ActionsPerfilesNews.requestPerfiles(this.state, this.props.register_objeto));
            this.bandera=true                
            this.setState({
                codigoPerfilNews: "",
                nombreNews: "",
                descripcionNews: ""
            })
        }else{
            /*            
            this.props.dispatch(DialogsActions.updateErrorTitle('Error'));
            this.props.dispatch(DialogsActions.updateErrorMsg('Digite [Codigo Perfil, Nombre Perfil, Descripcion Perfil]' ));
            this.props.dispatch(DialogsActions.updateErrorOpen(true));
            */            
            Notification.show({
                "message": "Digite [Codigo Perfil, Nombre Perfil, Descripcion Perfil]",
                "type": "error"
            });

        }
    }
    _handleClickReset(){
        this.props.dispatch(ActionsPerfilesNews.resetTableTablePerfilesNews());
        this.setState({
            codigoPerfilNews: "",
            nombreNews: "",
            descripcionNews: ""
        })
    }
    render() {
        let mostrar={"display":((this.state.nombreNews!=="")||(this.state.descripcionNews!=="")||(this.state.codigoPerfilNews!==""))?"block":"none", width:"80%", float:"right"};        
        
        return (
            <div>
                <div className="row"> 
                     <div className="col m4 s4">
                        <TextField
                            hintText="Nombre"                                    
                            floatingLabelText="Nombre*"
                            name='nombreNews'                        
                            value={this.state.nombreNews}                                             
                            onChange={this._handleChange}                                                        
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Código"
                            floatingLabelText="Código*"
                            name='codigoPerfilNews'       
                            value={this.state.codigoPerfilNews}                                             
                            onChange={this._handleChange}
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
                        />
                    </div>                       
                    <div className="col m4 s4">
                        <TextField
                            hintText="Descripción"                                    
                            floatingLabelText="Descripción*"
                            name='descripcionNews'                        
                            value={this.state.descripcionNews}                                             
                            onChange={this._handleChange}                                                        
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
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
                    <div className="col">
                        <RaisedButton
                            type="submit"
                            primary={true}
                            label="REGISTRAR"
                            disabled={this.state.habilitaRegistro}                            
                            buttonStyle={{
                                background: "#2196F3"                              
                            }}
                            overlayStyle={{
                                background: "#2196F3"                              
                            }}
                            labelStyle={{color: "#FFFFFF"}}
                            onClick={this._handleClick}
                        />
                    </div>
                </div>    
           </div>   
        );
    }
}
export default Newsprofiles;
