import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import * as DialogsActions from 'actions/common/dialogs';
import * as ActionsSearchUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import * as c from 'actions/forms/catalogs/usuarios/SearchUsersActions';
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
import DataTable from "components/base/generic/DataTable/DataTable";
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import diff from 'deep-diff';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


/** CONSTANTES */
const styles = {
    container: {
        textAlign: 'center',
    },
    component: {
        paddingTop: 10
    },
    circular: {},
    titleStyle: {
        fontSize: 16,
        color: deepOrange500,
    },
    footerToolbarStyle: {
        padding: '0 100px',
    },
    tableStyle: {
        tableLayout: 'auto',
    },
    tableBodyStyle: {
        overflowX: 'auto',
    },
    tableWrapperStyle: {
        padding: 5,
    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    }
};

@connect((store) => {        
    return {                       
        dialogValidationUS: store.commonDialogs.validationUS,                                    
        selectedRow:store.catSearchUsuarios.objeto,        
        //profileFaculties: store.catSearchProfiles.profileFaculties
        userFacultiesDND: store.catSearchUsuarios.userFacultiesDND,
        userDTUserSucursales: store.catSearchUsuarios.userDTUserSucursales,
        userInfo: store.commonAuth,
        catalogoEmpresas: store.catSearchUsuarios.catalogEmpresas,
        catalogSucursales: store.catSearchUsuarios.catalogSucursales
    };
})


class FormUsersSuc extends Component {
    constructor(props) {        
        super(props);           
        this.state = {
            codigoPerfilUPDATE: null,
            descripcionPerfilUPDATE:"",
            open: false,
            anchorEl:null,            
            constrolsHeaderDataTable:[{
                "edith": false,
                "edithES": true,
                "delete": true,
                "active":true,
                "bash":false,
                "bashFac": false,
                "bashProf":false
            }]
        }        
        this.usuario= this.props.userInfo.userInfo.usuario;
        this.headers = [
            {
                key: 'Nombre',
                label: 'Nombre',
                sortable: true
            },
            {
                key: 'Codigo',
                label: 'Código',
                sortable: true
            },
            {
                key: 'Descripcion',
                label: 'Descripción',
                sortable: true
            },
            {
                key: 'Tipo',
                label: 'Tipo',
                sortable: true
            },
            {
                key: 'Empresa',
                label: 'Empresa'
            },
            {
                key: 'Sucursal',
                label: 'Sucursal'
            }
        ];
        // Bind methods
        //this.handleClose = this.handleClose.bind(this);
        this.handleClose = this.handleClose.bind(this);        
        this._handleOnFormSubmit = this._handleOnFormSubmit.bind(this);    
        this.handleRowSelection = this.handleRowSelection.bind(this);    
        this.handleClickDelete = this.handleClickDelete.bind(this);    
        this.handleClickActive = this.handleClickActive.bind(this);    
        this.handleClickEdith = this.handleClickEdith.bind(this);    
        this.handleTouchTap = this.handleTouchTap.bind(this);    
        this.handleRequestClose = this.handleRequestClose.bind(this);             
        this.handleSelectBusiness = this.handleSelectBusiness.bind(this);             
        
    }  
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
        open: true,
        anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
        open: false,
        });
    };
    handleRowSelection(selectedRows) {       
    }
    handleClickDelete = () => {                         
    } 
    handleClickActive = () => {                         
    }
    handleClickEdith = () => {                         
    }
    
    handleSelectBusiness = (id) => {                         
        
        this.props.dispatch(ActionsSearchUsers.catSucursales({
            "claveEmpresa": id
        }));
    }
    
    componentWillMount = () => {                         
        this.props.dispatch(DialogsActions.resetValidationOpenUS(false));                 
    }  
    
    handleClose = () => {
        this.props.dispatch(DialogsActions.resetValidationOpenUS()); 
        this.props.dispatch(DialogsActions.updateValidationOpenUS(false));        
    };
     
    _handleOnFormSubmit() {
        //console.log("_handleOnFormSubmit",this.props.selectedRow,this.state.dndI2,this.usuario);
        this.props.dispatch(ActionsSearchUsers.actualizaUsuarioFacultades(this.props.selectedRow,this.state.dndI2,this.usuario));                               
        this.props.dispatch(DialogsActions.updateValidationOpenUS(false));                
    };
      
  
    render() { 

        let catEmpresas = [], catSucursales=[];
        if (this.props.catalogoEmpresas.length > 0) {

            this.props.catalogoEmpresas.map((item,index) => {
                index=index+1;
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
        //console.log("FORM", this.props.userInfo.userInfo);
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
                open={this.props.dialogValidationUS}
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
                    
            <div style={{
                    position:'relative',
                    height:'0',                    
                    maxWidth:'100%',
                    paddingBottom:'56.25%'
                    }}>
            <iframe id="rifindependencia" src={"http://169.169.4.11:7011/sic/Seguridad/Usuario/usr_relaciones.jsp?txtNombre="+this.props.userInfo.userInfo.nombre+"&txtAPaterno="+this.props.userInfo.userInfo.apellidoPaterno+"&txtAMaterno="+this.props.userInfo.userInfo.apellidoMaterno+"&txtPersona="+this.props.userInfo.userInfo.noPersona+"&txtLogin="+this.props.userInfo.userInfo.usuario+"&txtMail=alopezavil@independencia.com.mx&lstPerfil="+this.props.userInfo.userInfo.perfil+"&rdEstado=A&lstPuesto=1"}  
                onLoad={() => {
                    
                    //const obj = ReactDOM.findDOMNode(this);
                    //console.log("ReactDOM.findDOMNode",obj);
                    /*this.setState({
                        iFrameHeight:  obj.contentWindow.document.body.scrollHeight + 'px'
                    });*/
                }} 
                style={{
                    position:'absolute',
                    top:'0',
                    left:'0',
                    width:'100%',
                    height:"2228px",
                    border:0
                    }}
                
                ></iframe>
            </div> 

            </Dialog>
            </div>
        );
    }
}
 
export default FormUsersSuc;
