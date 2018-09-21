/**
 *
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/** Material-UI */
import {Paper, TextField, RaisedButton, AutoComplete, SelectField, MenuItem} from 'material-ui';
/** Redux actions */
import * as ActionsSearchFacultades from 'actions/forms/catalogs/facultades/SearchFacultadesActions';
import {generaCatalogo} from "./utilsFacultades";
/** Custom styles */

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
        /** Dialogs */
        facultadesList: generaCatalogo(store.catFacultades.catalogos),
        modulsList: store.catSearchModuls.catalogos
    };
})

    /**
     *
     */
class SearchFacultades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoFacultad: "",
            nombre: "",
            estatus: "A",
            modulo:"",
            botonEnviar: false
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
        this._handleUpdateEstatus = this._handleUpdateEstatus.bind(this);
        this._handleUpdateModulo = this._handleUpdateModulo.bind(this);
        this._handleUpdateNombre = this._handleUpdateNombre.bind(this);

    }

    _handleChange(event, newValue) {

        switch (event.target.name) {
            case 'codigoFacultad':
                this.setState({
                    codigoFacultad: newValue.toUpperCase()
                });
                break;
        }
    };
    _handleUpdateEstatus = (event, index, value) => {
        this.setState({
            estatus: value
        });
    };
    _handleUpdateModulo = (event, index, value) => {
        this.setState({
            modulo: value
        });
    };
    _handleUpdateNombre = (chosenRequest) => {
        let nombreUp=chosenRequest.toUpperCase();
        this.setState({
            nombre: nombreUp
        });
    };
    _handleClick() {
        let campos={
            codigoFacultad: (this.state.codigoFacultad==="")?null:this.state.codigoFacultad,
            nombre: this.state.nombre,
            estatus: this.state.estatus,
            modulo: this.state.modulo
        };

        this.props.dispatch(ActionsSearchFacultades.consultaFacultades(campos));
    }

    _handleClickReset() {
        this.setState({
            codigoFacultad: "",
            nombre: "",
            estatus: "A",
            modulo:""
        });
    }

    render() {
        let mostrar={"display":((this.state.nombre!=="")||(this.state.codigoFacultad!=="")||(this.state.modulo!==""))?"block":"none", width:"80%", float:"right"};
        const dataSourceConfig = {
            text: 'textKey',
            value: 'valueKey',
        };

        let array = [];
        if (this.props.modulsList.length > 0) {

            this.props.modulsList.map((item,index) => {

                array.push(
                    <MenuItem key={index} value={item.codigoModulo} primaryText={item.nombre} />
                );
            });
        }

        return (
            <div>
                <div className="row" >
                    <div className="col m3 s3">
                        <AutoComplete
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            name='nombre'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            searchText = {this.state.nombre}
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={this.props.facultadesList}
                            dataSourceConfig={dataSourceConfig}
                            onUpdateInput={this._handleUpdateNombre}
                        />
                    </div>
                    <div className="col m3 s3">
                        <TextField
                            hintText="Código"
                            floatingLabelText="Código"
                            name='codigoFacultad'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.codigoFacultad}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Estatus"
                            value={this.state.estatus}
                            onChange={this._handleUpdateEstatus}
                            name='estatus'
                        >
                            <MenuItem value={"A"} primaryText="Activo" />
                            <MenuItem value={"I"} primaryText="Inactivo" />
                        </SelectField>
                    </div>
                    <div className="col m3 s3">
                        <SelectField
                            floatingLabelText="Módulo"
                            value={this.state.modulo}
                            onChange={this._handleUpdateModulo}
                            name='modulo'
                        >
                            {array}
                        </SelectField>
                    </div>
                </div>
                <div className="row">
                    <div className="col s3 offset-s7">
                        <RaisedButton
                            type="submit"
                            label="LIMPIAR BUSQUEDA"
                            style={mostrar}
                            labelStyle={{color: "#2196F3"}}
                            onClick={this._handleClickReset}
                        />
                    </div>
                    <div className={"col"}>
                        <RaisedButton
                            type="submit"
                            primary={true}
                            label="BUSCAR"
                            buttonStyle={{background: "#2196F3"}}
                            labelStyle={{color: "#FFFFFF"}}
                            onClick={this._handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchFacultades;