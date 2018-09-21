
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import DataTables from 'material-ui-datatables';
import {deepOrange500} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PaginationUtils from 'utils/pagination';
import * as ActionsNewsProfiles from 'actions/forms/catalogs/perfiles/Newsprofiles';
import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';
import * as DialogsActions from 'actions/common/dialogs';
import DataTable from "components/base/generic/DataTable/DataTable";
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

const TABLE_COLUMNS = [     
    {
        key: 'descripcion',
        label: 'Nombre',
    },
    {
        key: 'codigoPerfil',
        label: 'Codigo',
    }
    ,
    {
        key: 'estatus',
        label: 'Estatus',
    }
    ,
    {
        key: 'fechaHoraAlta',
        label: 'Fecha Registro',
    }
];

@connect((store) => {
    return {
        //register_profilesList: store.catNewProfiles.data,
        register_index: store.catNewProfiles.index,
        register_objeto: generaData(store.catNewProfiles.objeto),
        acceptDelete: store.commonDialogs.confirm,
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth 
    };
})


class DTProfilesNews extends Component {
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
                }
                ,
                {
                    key: 'fechaHoraAlta',
                    label: 'Fecha de registro',
                    sortable: true,
                    type: 'date'
                }
            ],
            constrolsHeaderDataTableNEWS:[{    
                "edith": true,
                "delete": true,
                "bash":true,
                "bashFac": true,
                "bashProf": false,
                "bashSuc":false
            }]
        };      
        // Bind methodss    
        this.usuario= this.props.userInfo.userInfo.usuario;    
        this.handleRowSelectionNEWS = this.handleRowSelectionNEWS.bind(this);       
        this.handleClickDeleteNEWS = this.handleClickDeleteNEWS.bind(this);
        this.handleClickEdithNEWS = this.handleClickEdithNEWS.bind(this);
        this.handleClickBashPF = this.handleClickBashPF.bind(this);
        this.handleAcceptNEWS = this.handleAcceptNEWS.bind(this);
    }

    handleRowSelectionNEWS(selectedRows) {       
        //debugger
        //console.log("handleRowSelectionNEWS",selectedRows,this.props.profilesList[selectedRows[0]],this.props.profilesList[selectedRows[0]]['estatus']);
        if(selectedRows[0] >= 0){ 
            this.props.dispatch(ActionsNewsProfiles.requestChangeIndex(selectedRows))        
            if(this.props.register_objeto[selectedRows[0]]['estatus']=='INACTIVO'){                
                this.setState({
                    constrolsHeaderDataTableNEWS:[{    
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
                    constrolsHeaderDataTableNEWS:[{    
                        "edith": true,
                        "delete": true,
                        "active":false,
                        "bash":false,
                        "bashFac": false,
                        "bashProf":false,
                        "bashSuc":false
                    }]
                })       
            }
        }else{
             this.setState({
                constrolsHeaderDataTableNEWS:[{    
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
    handleClickEdithNEWS = ()  => {        
        //debugger
        if(this.props.register_index >= 0){             
            let inde = this.props.register_index;
            let tmpData = [];
            tmpData = this.props.register_objeto[inde[0]];            
            this.props.dispatch(ActionsSearchPerfiles.updateObject(tmpData));        
            this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));                        
        }
    };    
     handleClickDeleteNEWS = (selection) => {
        //debugger
        this.positionSelect=this.props.register_index;;
        this.dataIni=this.props.register_objeto;
        let tmpData = [], DescripcionNombre="";
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;

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
    handleAcceptNEWS = () => {
        //debugger
        let tmpData, select=[];        
        this.dataIni.map((value,index)=>{
            this.positionSelect.map((entidad)=>{
                if (index===entidad){
                    select.push(value.codigoPerfil);
                }
            });
        });
        
        
        tmpData={
            "codigoPerfil": select[0],
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario
        };

        this.props.dispatch(ActionsNewsProfiles.deleteProfileNew(tmpData,this.dataIni,this.positionSelect.sort(function(a, b){return a-b})));
        //this.props.dispatch(ActionsSearchModuls.catModulos());
        this.banderaDelete=false;
        this.banderaActive=false;
        
    };
    handleClickBashPF = ()  => {
      
      this.props.dispatch(DialogsActions.updateValidationOpen(true));        
    };
    render() { 
        if (this.props.accept.delete&&this.banderaDelete||this.props.accept.active&&this.banderaActive){
            this.handleAcceptNEWS();
        }
        return (
        <div style={styles.component}>            
            <DataTable
                data={this.props.register_objeto}
                headers={this.state.TABLE_COLUMNS}
                showCheckboxes={true}
                enableSelectAll={false}
                multiSelectable={false}
                selectable={true}
                onRowSelection={this.handleRowSelectionNEWS}
                showHeaderToolbar={true}
                showFooterToolbar={false}
                onRowDelete={this.handleClickDeleteNEWS}
                onRowEdith={this.handleClickEdithNEWS}
                toolbarControls={this.state.constrolsHeaderDataTableNEWS}
                onClickBashPF={this.handleClickBashPF}
            />                           
        </div>
      );
    }
}
 
export default DTProfilesNews;
