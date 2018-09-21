
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import DataTables from 'material-ui-datatables';
import {deepOrange500} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PaginationUtils from 'utils/pagination';
import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';
import * as DialogsActions from 'actions/common/dialogs';
import DataTable from "components/base/generic/DataTable/DataTable";
import * as CatalogsActions from 'actions/forms/catalogs/catalogs';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {generaData} from "./utilProfiles";

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
    }
};



@connect((store) => {
    return {
        faculties: store.catProfiles.facultades,                 
        profilesList: generaData(store.catSearchProfiles.data),                
        profileSelected:store.catSearchProfiles.objeto,
        index: store.catSearchProfiles.index,
        acceptDelete: store.commonDialogs.confirm,
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth
    };
})


class DataTablePerfilesEdith extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            open: false,            
            showProgress: false,            
            TABLE_COLUMNS : [     
                {
                    key: 'nombre',
                    label: 'Nombre',
                    sortable: true
                },
                {
                    key: 'codigoPerfil',
                    label: 'Código',
                    sortable: true
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    sortable: true
                }
                ,
                {
                    key: 'estatus',
                    label: 'Estatus',
                    sortable: true
                },
                {
                    key: 'fechaHoraAlta',
                    label: 'Fecha de registro',
                    sortable: true,
                    type: 'date'
                }
            ],
            constrolsHeaderDataTable:[{    
                "edith": true,
                "delete": true,
                "bash":true,
                "bashFac": true,
                "bashProf":false,
                "bashSuc":false
            }]
        };  
        this.banderaDelete=false;            
        this.banderaActive=false;
        this.usuario= this.props.userInfo.userInfo.usuario;
        this.handleRowSelection = this.handleRowSelection.bind(this);              
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickEdith = this.handleClickEdith.bind(this);
        this.handleClickBashPF = this.handleClickBashPF.bind(this);
        //this.handleAcceptDelete = this.handleAcceptDelete.bind(this);
        this.handleClickActive = this.handleClickActive.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        
    }
    componentWillMount = () => {  
        this.props.dispatch(CatalogsActions.resetFaculties());        
        this.props.dispatch(CatalogsActions.requestCatalogFaculties());              
    }  
    handleRowSelection(selectedRows) {       
        
        if(selectedRows[0] >= 0){ 
            this.props.dispatch(ActionsSearchPerfiles.requestChangeIndex(selectedRows))        
            if(this.props.profilesList[selectedRows[0]]['estatus']=='INACTIVO'){                
                this.setState({
                    constrolsHeaderDataTable:[{    
                        "edith": false,
                        "delete": false,
                        "active":true,
                        "bash":false,
                        "bashFac": false,
                        "bashProf":false
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
                        "bashProf":false
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
                    "bashProf":false
                }]
            })  
        }
        
    }
    handleClickEdith = ()  => {        
        
        if(this.props.index[0] >= 0){             
            let inde = this.props.index;
            let tmpData = [];
            tmpData = this.props.profilesList[inde[0]];            
            this.props.dispatch(ActionsSearchPerfiles.updateObject(tmpData));        
            this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));            
            
        }
    };    
     handleClickDelete = (selection) => {

        this.positionSelect=this.props.index;
        this.dataIni=this.props.profilesList;
        let tmpData = [], DescripcionNombre="";
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;
        console.log("handleClickDelete",this.positionSelect)
        if (this.positionSelect.length===1){
            DescripcionNombre="Está a punto de dar de baja el Perfil "+this.dataIni[this.positionSelect[0]].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(this.positionSelect.length>1){
            DescripcionNombre="Está a punto de dar de baja "+this.positionSelect.length+" perfiles, ¿Está seguro que desea realizar esta acción?"
        }
        let confirm={
            "mostrar": true,
            "accion": "I",
            "descripcion": DescripcionNombre,
            "delete": false,
            "active": false
        };
        //this.props.dispatch(ActionsSearchModuls.updateObject(tmpData));
        this.props.dispatch(DialogsActions.confirmEstatusView(confirm));
        this.banderaDelete=true;
    };
    handleClickActive = (selection) => {

        this.positionSelect=this.props.index;
        this.dataIni=this.props.profilesList;
        let tmpData = [], DescripcionNombre="";
        
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;
        
        if (this.positionSelect.length===1){
            DescripcionNombre="Está a punto de dar de alta el Perfil "+this.dataIni[this.positionSelect[0]].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(this.positionSelect.length>1){
            DescripcionNombre="Está a punto de dar de alta "+this.positionSelect.length+" Perfil, ¿Está seguro que desea realizar esta acción?"
        }
        let confirm={
            "mostrar": true,
            "accion": "A",
            "descripcion": DescripcionNombre,
            "delete": false,
            "active": false
        };
        //this.props.dispatch(ActionsSearchModuls.updateObject(tmpData));
        this.props.dispatch(DialogsActions.confirmEstatusView(confirm));
        this.banderaActive=true;
    };
    handleAccept = () => {
        
        let tmpData, select=[];
        this.dataIni.map((value,index)=>{
            this.positionSelect.map((entidad)=>{
                if (index===entidad){
                    select.push(value.codigoPerfil);
                }
            });
        });
        
        
        tmpData={
            "codigosPerfiles": select,
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario
        };
        this.props.dispatch(ActionsSearchPerfiles.updateProfile(tmpData,this.dataIni,this.positionSelect.sort(function(a, b){return a-b})));
        //this.props.dispatch(ActionsSearchModuls.catModulos());
        this.banderaDelete=false;
        this.banderaActive=false;
        
    };
    handleClickBashPF = ()  => {
      
        if(this.props.index[0] >= 0){             
            let inde = this.props.index;
            let tmpData = [];
            tmpData = this.props.profilesList[inde[0]];            
            this.props.dispatch(ActionsSearchPerfiles.updateObject(tmpData));                             
            this.props.dispatch(ActionsSearchPerfiles.searchProfilesFaculties(tmpData,this.props.faculties));            
            setTimeout( () => {
                this.props.dispatch(DialogsActions.updateValidationOpen(true))
            },1000);                      
        }       
        
    };
    /*
    handleAcceptDelete = () => {
        
        console.log("handleAcceptDelete",this.props.profileSelected);
        this.props.dispatch(ActionsSearchPerfiles.deleteProfile(this.props.profileSelected));
        this.banderaDelete=false
    };*/
    render() {
         /*if (this.props.acceptDelete.delete&&this.banderaDelete){

            this.handleAcceptDelete();
         }*/

        if (this.props.accept.delete&&this.banderaDelete||this.props.accept.active&&this.banderaActive){
            this.handleAccept();
        }
        return (        
        <div id="TableHeader" style={styles.component}>            
            <DataTable
                data={this.props.profilesList}
                headers={this.state.TABLE_COLUMNS}
                showCheckboxes={true}
                enableSelectAll={false}
                multiSelectable={true}
                selectable={true}
                onRowSelection={this.handleRowSelection}
                showHeaderToolbar={true}
                onRowActive={this.handleClickActive}
                onRowDelete={this.handleClickDelete}                
                toolbarControls={this.state.constrolsHeaderDataTable}
                onClickBashPF={this.handleClickBashPF}
                onRowEdith={this.handleClickEdith}
                title={"Resultados de Búsqueda"}
                card={true}
            />                           
        </div>
      );
    }
}
 
export default DataTablePerfilesEdith;