import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import * as ActionsSearchUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import * as DialogsActions from 'actions/common/dialogs';
import * as CatalogsActions from 'actions/forms/catalogs/catalogs';
import DataTable from "components/base/generic/DataTable/DataTable";
import {generaData} from "./utilUsers";


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
};



@connect((store) => {
    return {
        usersList: generaData(store.catSearchUsuarios.data),
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth,
        index: store.catSearchUsuarios.index,
        profilesList:store.catProfiles.usarioPerfiles,
        facultadesLista: store.catProfiles.facultadesLista
    };
})


class DTUsersEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showProgress: false,
            constrolsHeaderDataTable:[{
                "edith": true,
                "delete": true,
                "active":true,
                "bash":false,
                "bashFac": false,
                "bashProf":false,
                "bashSuc":false
            }]
        };
        
        this.usuario= this.props.userInfo.userInfo.usuario;                
        this.headers = [
            {
                key: 'nombre',
                label: 'Nombre',
                sortable: true
            },
            {
                key: 'apePaterno',
                label: 'Apellido paterno',
                sortable: true
            },
            {
                key: 'apeMaterno',
                label: 'Apellido materno',
                sortable: true
            },
            {
                key: 'puesto',
                label: 'Perfil asociado',
                sortable: true
            },
            {
                key: 'persona',
                label: 'No. de empleado'
            },
            {
                key: 'estatus',
                label: 'Estatus'
            }
        ];
        this.positionSelect="";
        this.dataIni= [];
        this.banderaDelete=false;
        this.banderaActive=false;
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickActive = this.handleClickActive.bind(this);
        this.handleClickEdith = this.handleClickEdith.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleClickBashUF = this.handleClickBashUF.bind(this);
        this.handleClickBashUP = this.handleClickBashUP.bind(this);
        this.handleClickBashUS = this.handleClickBashUS.bind(this);

    }
    componentWillMount = () => {  
        this.props.dispatch(CatalogsActions.resetFaculties());        
        this.props.dispatch(CatalogsActions.requestCatalogFaculties());                      
    }  
    handleRowSelection(selectedRows) {
        
        if(selectedRows[0] >= 0){ 
            this.props.dispatch(ActionsSearchUsers.requestChangeIndex(selectedRows))                    
            if(this.props.usersList[selectedRows[0]]['estatus']=='INACTIVO'){                
                this.setState({
                    constrolsHeaderDataTable:[{    
                        "edith": false,
                        "delete": false,
                        "active":true,
                        "bash":false,
                        "bashFac": false,
                        "bashProf":false,
                        "bashSuc":false
                    }]
                })
            }else{
                this.setState({
                    constrolsHeaderDataTable:[{    
                        "edith": true,
                        "delete": true,
                        "active":false,
                        "bash":true,
                        "bashFac": true,
                        "bashProf":true,
                        "bashSuc":true
                    }]
                })       
            }
        }else{
             this.setState({
                constrolsHeaderDataTable:[{    
                    "edith": false,
                    "delete": false,
                    "active":false,
                    "bash":false,
                    "bashFac": false,
                    "bashProf":false,
                    "bashSuc":false
                }]
            })  
        }
    }
    handleClickEdith = (selection)  => {
        
        this.positionSelect=this.props.index;
        let tmpData = [];
        tmpData = this.props.usersList[this.props.index[0]];
        tmpData.index=this.props.index[0];
        tmpData.Add=false;
        tmpData.Edit=true;

        this.props.dispatch(ActionsSearchUsers.resetObject());
        this.props.dispatch(ActionsSearchUsers.updateObject(tmpData));

        this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));
    };

    handleClickBashUF = (selection)  => {

        if(this.props.index >= 0){             
            
            let inde = this.props.index;
            let tmpData = [];
            tmpData = this.props.usersList[inde[0]];  
            console.log("handleClickBashUF",tmpData);
            this.props.dispatch(ActionsSearchUsers.resetObject());          
            this.props.dispatch(ActionsSearchUsers.updateObject(tmpData));                                         
            this.props.dispatch(ActionsSearchUsers.searchUserFaculties(this.props.facultadesLista,tmpData.claveUsuario));            
            
            setTimeout( () => {
                this.props.dispatch(DialogsActions.updateValidationOpenUF(true))
            },1000);    
        
            
        }  

    };

    handleClickBashUP = ()  => {
        
        if(this.props.index >= 0){                         
            let inde = this.props.index;
            let tmpData = [];
            tmpData = this.props.usersList[inde[0]];            
            this.props.dispatch(ActionsSearchUsers.resetObject());
            this.props.dispatch(ActionsSearchUsers.updateObject(tmpData));                                                     
            this.props.dispatch(ActionsSearchUsers.searchUserProfiles(this.props.profilesList,tmpData.claveUsuario));            
            setTimeout( () => {
                this.props.dispatch(DialogsActions.updateValidationOpenUP(true))
            },1000);                      
        }   
       
    };
    handleClickBashUS = ()  => {
        
        if(this.props.index >= 0){                         
            let inde = this.props.index;
            let tmpData = [];
            tmpData = this.props.usersList[inde[0]];            
            this.props.dispatch(ActionsSearchUsers.resetObject());
            this.props.dispatch(ActionsSearchUsers.updateObject(tmpData));                                                     
            this.props.dispatch(ActionsSearchUsers.searchUserProfilesUS(this.usuario));            
            //sdebugger
            setTimeout( () => {
                this.props.dispatch(DialogsActions.updateValidationOpenUS(true))
            },1000);
            //this.props.dispatch(DialogsActions.updateValidationOpenUS(true))
        }   
       
    };

    handleClickDelete = (selection) => {

        this.positionSelect=this.props.index;
        this.dataIni=this.props.usersList;
        let tmpData = [], DescripcionNombre="";
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;

        if (this.positionSelect.length===1){
            DescripcionNombre="Está a punto de dar de baja el usuario "+this.dataIni[this.positionSelect[0]].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(this.positionSelect.length>1){
            DescripcionNombre="Está a punto de dar de baja "+this.positionSelect.length+" usuarios, ¿Está seguro que desea realizar esta acción?"
        }
        let confirm={
            "mostrar": true,
            "accion": "I",
            "descripcion": DescripcionNombre,
            "delete": false,
            "active": false
        };
        //this.props.dispatch(ActionsSearchModuls.updateObject(tmpData));
        this.banderaDelete=true;
        this.banderaActive=false;
        this.props.dispatch(DialogsActions.confirmEstatusView(confirm));
    };
    handleClickActive = (selection) => {

        this.positionSelect=this.props.index;
        this.dataIni=this.props.usersList;
        let tmpData = [], DescripcionNombre="";

        if (this.positionSelect.length===1){
            let usuario=this.dataIni[this.positionSelect[0]].nombre;
            DescripcionNombre="Está a punto de dar de alta el usuario "+usuario+ ", ¿Está seguro que desea realizar esta acción?"
        }else if(this.positionSelect.length>1){
            DescripcionNombre="Está a punto de dar de alta "+this.positionSelect.length+" Usuarios, ¿Está seguro que desea realizar esta acción?"
        }
        let confirm={
            "mostrar": true,
            "accion": "A",
            "descripcion": DescripcionNombre,
            "delete": false,
            "active": false
        };
        this.banderaActive=true;
        this.banderaDelete=false;
        this.props.dispatch(DialogsActions.confirmEstatusView(confirm));
    };
    handleAccept = () => {

        let tmpData, select=[];
        this.dataIni.map((value,index)=>{
            this.positionSelect.map((entidad)=>{
                if (index===entidad){
                    select.push(value.claveUsuario);
                }
            });
        });
        tmpData={
            "clavesUsuarios" :  select,
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario

        };
        this.props.dispatch(ActionsSearchUsers.deleteActiveUsers(tmpData,this.dataIni,this.positionSelect.sort(function(a, b){return a-b})));
        this.banderaDelete=false;
        this.banderaActive=false;
    };

    render() {

        if (this.props.accept.delete&&this.banderaDelete||this.props.accept.active&&this.banderaActive){

            this.handleAccept();
        }
        
        return (
            <div style={styles.component}>
                <DataTable
                    title="Resultados de Búsqueda"
                    data={this.props.usersList}
                    headers={this.headers}
                    showCheckboxes={true}
                    enableSelectAll={true}
                    multiSelectable={true}
                    selectable={true}
                    onRowSelection={this.handleRowSelection}
                    showHeaderToolbar={true}
                    onRowDelete={this.handleClickDelete}
                    onRowActive={this.handleClickActive}
                    onRowEdith={this.handleClickEdith}
                    toolbarControls={this.state.constrolsHeaderDataTable}
                    onClickBashPF={this.handleClickBashUF}
                    onClickBashUP={this.handleClickBashUP}
                    onClickBashUS={this.handleClickBashUS}
                />
            </div>
        );
    }
}

export default DTUsersEdit;