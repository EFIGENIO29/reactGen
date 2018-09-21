/** CONSTANTES */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import * as ActionsSearchUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
import * as DialogsActions from 'actions/common/dialogs';
import DataTable from "components/base/generic/DataTable/DataTable";
import {generaData} from "./utilUsers";



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
        dataNew: generaData(store.catSearchUsuarios.dataNew),
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth

    };
})


class DTUsersNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showProgress: false,
            constrolsHeaderDataTable:[{
                "edith": true,
                "delete": true,
                "bash":false,
                "bashFac": false,
                "bashProf": false,
                "bashSuc":false
            }]
        };
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
        this.banderaDelete=false;
        this.dataIni= [];
        this.usuario= this.props.userInfo.userInfo.usuario;
        // Bind methodss
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickEdith = this.handleClickEdith.bind(this);

    }
    handleRowSelection(selectedRows) {
    }
    handleClickEdith = (selection)  => {

        this.positionSelect=selection[0];
        let tmpData = [];
        tmpData = this.props.dataNew[selection];
        tmpData.index=selection[0];
        tmpData.Add=true;
        tmpData.Edit=false;

        this.props.dispatch(ActionsSearchUsers.resetObject());
        this.props.dispatch(ActionsSearchUsers.updateObject(tmpData));
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));

    };
    handleClickDelete = (selection) => {

        this.positionSelect=selection;
        this.dataIni=this.props.dataNew;
        let tmpData = [], DescripcionNombre="";

        if (selection.length===1){
            DescripcionNombre="Está a punto de dar de baja el usuario "+this.dataIni[selection].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(selection.length>1){
            DescripcionNombre="Está a punto de dar de baja "+selection.length+" usuarios, ¿Está seguro que desea realizar esta acción?"
        }
        //tmpData = this.dataIni[selection];
        //tmpData.index=selection[0];
        let confirm={
            "mostrar": true,
            "accion": "I",
            "descripcion": DescripcionNombre,
            "delete": false
        };
        //this.props.dispatch(ActionsSearchModuls.updateObject(tmpData));
        this.banderaDelete=true;
        this.banderaActive=false;
        this.props.dispatch(DialogsActions.confirmEstatusView(confirm));
    };

    handleAcceptDelete = () => {

        let tmpData, select=[];
        this.dataIni.map((value,index)=>{
            this.positionSelect.map((entidad)=>{
                if (index===entidad){
                    select.push(value.claveUsuario);
                }
            });
        });
        tmpData={

            "clavesUsuarios": select,
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario,
            "positions": this.positionSelect.sort(function(a, b){return a-b})
        };

        this.props.dispatch(ActionsSearchUsers.deleteUsersNew(tmpData,this.dataIni));
        this.banderaDelete=false;
        this.banderaActive=false;
    };
    render() {

        if (this.props.accept.delete&&this.banderaDelete){

            this.handleAcceptDelete();
        }
        return (
            <div style={styles.component}>
                <DataTable
                    data={this.props.dataNew}
                    headers={this.headers}
                    showCheckboxes={true}
                    enableSelectAll={true}
                    multiSelectable={true}
                    selectable={true}
                    onRowSelection={this.handleRowSelection}
                    showHeaderToolbar={true}
                    onRowDelete={this.handleClickDelete}
                    onRowEdith={this.handleClickEdith}
                    toolbarControls={this.state.constrolsHeaderDataTable}
                />
            </div>
        );
    }
}

export default DTUsersNews;