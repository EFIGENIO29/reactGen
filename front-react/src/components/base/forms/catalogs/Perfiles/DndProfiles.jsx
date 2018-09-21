import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as DialogsActions from 'actions/common/dialogs';
import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';
import DragDrop from 'components/base/generic/DragAndDrop/DragDrop';
import AppBar from 'material-ui/AppBar';
import * as CatalogsActions from 'actions/forms/catalogs/catalogs';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as ActionsDND from 'actions/common/dnd';
import _DeleteIcon  from 'material-ui/svg-icons/action/delete';
import _IconButton  from 'material-ui/IconButton';
import _ from 'underscore';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import diff from 'deep-diff';

  

const styles = {
  
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  }
};
@connect((store) => {        
    return {        
        faculties: store.catProfiles.facultades,                 
        facultiesList: store.catProfiles.facultadesLista,                 
        dialogValidation: store.commonDialogs.validation,            
        //facultiesListFilter: store.dnd.filterList,
        profileSelected:store.catSearchProfiles.objeto,
        profileFaculties: store.catSearchProfiles.profileFaculties,                
        dnd1: store.catSearchProfiles.dnd1,                
        dnd2: store.catSearchProfiles.dnd2                

    };
})


class DndProfiles extends Component {
    constructor(props) {        
        super(props);           
        this.state = {
            codigoPerfilUPDATE: null,
            descripcionPerfilUPDATE:"",
            evFecha:{display:"none"},            
            dateFaculty:""
        }        
        // Bind methods
        //this.handleClose = this.handleClose.bind(this);
        this.handleClose = this.handleClose.bind(this);        
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);    
        this._handleOnCheck = this._handleOnCheck.bind(this); 
        this._handleOnpushDND = this._handleOnpushDND.bind(this); 
        this._handleDate = this._handleDate.bind(this); 
        
    }  
    
    componentWillMount = () => {                 
        this.props.dispatch(ActionsSearchPerfiles.ResetAsignedDND()); 
        //this.props.dispatch(CatalogsActions.resetState());
        //this.props.dispatch(ActionsSearchPerfiles.resetProfileFaculties());
        //this.props.dispatch(CatalogsActions.requestCatalogFaculties());              
    }  
    
    handleClose = () => {
        this.props.dispatch(ActionsSearchPerfiles.ResetAsignedDND()); 
        this.props.dispatch(DialogsActions.updateValidationOpen(false));        
    };
    _handleOnpushDND(obj) {                        
        this.setState({
            dnd2: obj.cards,
            dndI2: obj.cards
        });
        
        this.props.dispatch(ActionsSearchPerfiles.updateFacultiesDND(this.props.profileFaculties,obj.listDND2));        
    };
 
     
    _handleDate(obj,date) {  
        console.log(obj, date);      
        /*this.setState({
            dateFaculty: date
        })*/
    };
    
    _handleOnFormSubmit() {
        //console.log("_handleOnFormSubmit",this.state.dndI2,this.props.profileSelected);
        this.props.dispatch(ActionsSearchPerfiles.actualizaPerfilesFacultades(this.props.profileSelected,this.state.dndI2));                               
        this.props.dispatch(DialogsActions.updateValidationOpen(false));                
    };
 
    _handleOnCheck(e,isInputChecked) {
        
        if(isInputChecked){
            this.setState({
                evFecha: {display:"block"}
            })
        }else{
            this.setState({
                evFecha: {display:"none"}
            })    
        }
    };         
  
    render() { 
        
        return ( 
            <div>
            <Dialog     
                title={
                    <div style={{
                        width: "100%",
                        display: "-webkit-box"
                        }}>
                        <div className="text-left" style={{width: "98%"}} >Administración de Facultades</div>
                        <div className="text-right" style={{width: "2%"}} >
                            <_IconButton 
                                tooltip="Cancelar"
                                onTouchTap={this.handleClose}
                                style={{padding:"0px"}}
                            >
                                <ActionCancel  color={"#FFFFFF"}  />
                            </_IconButton>
                        </div>
                    </div>
                }
                
                autoScrollBodyContent={true}                
                modal={true}
                open={this.props.dialogValidation}
                contentStyle={{
                    width: '95%',                    
                    maxWidth: 'none',
                    
                }}                
                titleStyle={{
                    backgroundColor:"#B71C1C",
                    color:"#FFFFFF",
                    padding:"12px 24px 3px"
                }}
            > 
                    
                <div className="row"> 
                    <div className="col s12" >                    
                </div>
                </div>
                <div className="row"> 
                    <div className="col s12" style={{marginLeft: "-10px"}}>
                    Perfil: &nbsp;<strong style={{color: "black"}}>{this.props.profileSelected.nombre}</strong>
                    </div>
                </div>         
                <div className="row"> 
                    <div className="col s12" >
                    <DragDrop 
                        facultiesList = {this.props.profileFaculties[0]}                        
                        facultiesListAssigned = {this.props.profileFaculties[1]}
                        OnPushDND = {this._handleOnpushDND}                        
                        txtDNDI = {"Facultades disponibles"}
                        txtDNDII = {"Facultades Asignadas"}
                    />
                    </div>
                </div>
                <div className="row">     
                    <div className="col s5 offset-s6"> 
                        <div style={{float:"right"}}>
                            <RaisedButton 
                                label="CANCELAR"
                                primary={true}
                                secondary={true}
                                buttonStyle={{backgroundColor:"#FFFFFF"}}
                                labelStyle={{color:"#478ECC"}}
                                onTouchTap={this.handleClose}
                            />&nbsp;&nbsp;                   
                            <RaisedButton 
                                label="GUARDAR" 
                                primary={true}
                                buttonStyle={{background: "#2196F3"}}
                                labelStyle={{color: "#FFFFFF"}}
                                onTouchTap={this._handleOnFormSubmit}
                            />
                        </div>    
                    </div>    
                </div> 

            </Dialog>
            </div>
        );
    }
}
 
export default DndProfiles;