/** CONSTANTES */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import * as ActionsSearchFacultades from 'actions/forms/catalogs/facultades/SearchFacultadesActions';
import * as DialogsActions from 'actions/common/dialogs';
import DataTable from "components/base/generic/DataTable/DataTable";
import {generaData} from "./utilsFacultades";



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
        dataNew: generaData(store.catFacultades.dataNew,"nuevo"),
        accept: store.commonDialogs.confirm,
        userInfo: store.commonAuth

    };
})


class DTFacultadesNews extends Component {
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
        this.headers =  [
            {
                key: 'nombre',
                label: 'Nombre',
                sortable: true
            },
            {
                key: 'codigoFacultad',
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
                key: 'nombreModulo',
                label: 'Módulo',
                sortable: true
            },
            {
                key: 'tipoFacultad',
                label: 'Tipo de facultad'
            },
            {
                key: 'url',
                label: 'URL'
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
            this.props.dispatch(ActionsSearchFacultades.resetObject());
            this.props.dispatch(ActionsSearchFacultades.updateObject(tmpData));
            this.props.dispatch(ActionsSearchFacultades.arbolMenu({"codigoFacultad":tmpData.codigoFacultad}));
            this.props.dispatch(ActionsSearchFacultades.consultaMenuPrincipal(tmpData.modulo.codigoModulo));
            this.props.dispatch(DialogsActions.updateValidationOpenEdith(true));

    };
    handleClickDelete = (selection) => {

        this.positionSelect=selection;
        this.dataIni=this.props.dataNew;
        let tmpData = [], DescripcionNombre="";

        if (selection.length===1){
            DescripcionNombre="Está a punto de dar de baja la Facultad "+this.dataIni[selection].nombre+
                ", ¿Está seguro que desea realizar esta acción?"
        }else if(selection.length>1){
            DescripcionNombre="Está a punto de dar de baja "+selection.length+" facultades, ¿Está seguro que desea realizar esta acción?"
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
                    select.push(value.codigoFacultad);
                }
            });
        });
        tmpData={
            "codigosFacultades": select,
            "estatus": (this.banderaDelete===true)?"I":"A",
            "usuarioUltimaModificacion": this.usuario,
            "positions": this.positionSelect.sort(function(a, b){return a-b})
        };

        this.props.dispatch(ActionsSearchFacultades.deleteFacultadNew(tmpData,this.dataIni));
        this.props.dispatch(ActionsSearchFacultades.catFacultades());
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

export default DTFacultadesNews;

DTFacultadesNews.defaultProps = {
    "register_objeto": []
};