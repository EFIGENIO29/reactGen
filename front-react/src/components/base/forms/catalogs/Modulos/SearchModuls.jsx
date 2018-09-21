/**
 *
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/** Material-UI */
import {Paper, TextField, RaisedButton, DatePicker, AutoComplete, SelectField, MenuItem} from 'material-ui';
/** Redux actions */
import * as ActionsSearchModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';
import {generaCatalogo} from "./utilModuls";
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
        modulsList: generaCatalogo(store.catSearchModuls.catalogos),
        dataModuls: store.catSearchModuls.data
    };
})

    /**
     *
     */
class SearchModuls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoModulo: "",
            nombre: "",
            estatus: "A",
            botonEnviar: false
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);
        this._handleUpdateNombre = this._handleUpdateNombre.bind(this);
        this._handleUpdateEstatus = this._handleUpdateEstatus.bind(this);

    }

    _handleChange(event, newValue) {

        switch (event.target.name) {
            case 'codigoModulo':
                this.setState({
                    codigoModulo: newValue.toUpperCase()
                });
                break;
        }
    }

    _handleClick() {
        let campos={
            codigoModulo: (this.state.codigoModulo==="")?null:this.state.codigoModulo,
            nombre: this.state.nombre,
            estatus: this.state.estatus,
        };

        this.props.dispatch(ActionsSearchModuls.consultaModulos(campos));
    }

    _handleClickReset() {
        this.setState({
            codigoModulo: "",
            nombre: "",
            estatus: "A"
        });
    }

    _handleUpdateNombre = (chosenRequest) => {

        this.setState({
            nombre: chosenRequest.toUpperCase()
        });
    };
    _handleUpdateEstatus = (event, index, value) => {

        this.setState({
            estatus: value
        });
    };

    render() {
        let mostrar={"display":((this.state.nombre!=="")||(this.state.codigoModulo!==""))?"block":"none"},
            classBoton=((this.state.nombre!=="")||(this.state.codigoModulo!==""))?"col s2 push-s8" :"col s2 push-s8 offset-s2";
        const dataSourceConfig = {
            text: 'textKey',
            value: 'valueKey',
        };
        return (
            <div>
                <div className="row">
                    <div className="col m4 s4">
                        <AutoComplete
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            name='nombre'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            searchText = {this.state.nombre}
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={this.props.modulsList}
                            dataSourceConfig={dataSourceConfig}
                            onUpdateInput={this._handleUpdateNombre}
                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Código"
                            floatingLabelText="Código"
                            name='codigoModulo'
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.codigoModulo}
                            onChange={this._handleChange}
                        />
                    </div>
                    <div className="col m4 s4">
                        <SelectField
                            floatingLabelText="Estatus"
                            value={this.state.estatus}
                            onChange={this._handleUpdateEstatus}
                            name='estatus'
                        >
                            <MenuItem value={"A"} primaryText="ACTIVO" />
                            <MenuItem value={"I"} primaryText="INACTIVO" />
                        </SelectField>
                    </div>
                </div>
                <div className="row">
                    <div className="col s2 push-s8" style={mostrar}>
                        <RaisedButton
                            type="submit"
                            label="LIMPIAR BUSQUEDA"
                            labelStyle={{color: "#2196F3"}}
                            onClick={this._handleClickReset}
                        />
                    </div>
                    <div className={classBoton}>
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
export default SearchModuls;