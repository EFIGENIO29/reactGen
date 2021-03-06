
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import * as ActionsSearchModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';
import * as DialogsActions from 'actions/common/dialogs';
import DataTable from "components/base/generic/DataTable/DataTable";
import {generaData} from "./utilModuls";


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
        profilesList: generaData(store.catSearchModuls.data),
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth
    };
})


class DTModulsEdit extends Component {
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
        this.headers = [
            {
                key: 'nombre',
                label: 'Nombre',
                sortable: true
            },
            {
                key: 'codigoModulo',
                label: 'Codigo',
                sortable: true
            },
            {
                key: 'descripcion',
                label: 'Descripción',
                sortable: true
            },
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
            },
            {
                key: 'fechaHoraUltimaModificacion',
                label: 'Fecha de modificación',
                sortable: true,
                type: 'date'
            }
        ];
        this.positionSelect="";
        this.dataIni= [];
        this.banderaDelete=false;
        this.banderaActive=false;
        this.usuario= this.props.userInfo.userInfo.usuario;
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickActive = this.handleClickActive.bind(this);
        this.handleClickEdith = this.handleClickEdith.bind(this);
        this.handleAccept = this.handleAccept.bind(this);

    }
    handleRowSelection(selectedRows,data) {
        //console.log("handleRowSelection",selectedRows,data);
    }
    handleClickEdith = (selection)  => {
        console.log(selection);
        this.positionSelect=selection[0];
        let tmpData = [];
        tmpData = this.props.profilesList[selection];
        tmpData.index=selection[0];
        tmpData.Add=false;
        tmpData.Edit=true;
        this.props.dispatch(ActionsSearchModuls.updateObject(tmpData));
        this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));
    };
    handleClickDelete = (selection) => {

        this.positionSelect=selection;
        this.dataIni=this.props.profilesList;
        let tmpData = [], DescripcionNombre="";
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;

        if (selection.length===1){
            DescripcionNombre="Está a punto de dar de baja el Módulo "+this.dataIni[selection].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(selection.length>1){
            DescripcionNombre="Está a punto de dar de baja "+selection.length+" módulos, ¿Está seguro que desea realizar esta acción?"
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

        this.positionSelect=selection;
        this.dataIni=this.props.profilesList;
        let tmpData = [], DescripcionNombre="";
        //tmpData = this.dataIni[selection];
        //tmpData.indexs=selection;

        if (selection.length===1){
            DescripcionNombre="Está a punto de dar de alta el Módulo "+this.dataIni[selection].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(selection.length>1){
            DescripcionNombre="Está a punto de dar de alta "+selection.length+" módulos, ¿Está seguro que desea realizar esta acción?"
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
                    select.push(value.codigoModulo);
                }
            });
        });
        tmpData={
            "codigosModulos": select,
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario
        };
        this.props.dispatch(ActionsSearchModuls.deleteActiveModul(tmpData,this.dataIni,this.positionSelect.sort(function(a, b){return a-b})));
        this.props.dispatch(ActionsSearchModuls.catModulos());
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
                    data={this.props.profilesList}
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
                    onClickBashPF={this.handleClickBashPF}
                />
            </div>
        );
    }
}

export default DTModulsEdit;