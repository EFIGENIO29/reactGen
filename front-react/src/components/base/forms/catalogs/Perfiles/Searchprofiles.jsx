/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** Material-UI */
import { Paper, TextField, RaisedButton, SelectField, MenuItem, DatePicker } from 'material-ui';
import AutoComplete from 'material-ui/AutoComplete';
/** Redux actions */
 import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';
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
        profilesList: store.catSearchProfiles.data,
        catalogProfiles: store.catProfiles.perfiles
    };
})

/**
 * 
 */
class Searchprofiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigoPerfil: "",
            descripcion:"",
            botonEnviar: false,
            estatus: "A",
        }
        
        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClickReset = this._handleClickReset.bind(this);                
        this._handleUpdateNombre = this._handleUpdateNombre.bind(this);
        this._handleUpdateEstatus = this._handleUpdateEstatus.bind(this);
        
    }
    _handleChange(event, newValue) {
        
        switch(event.target.name){
            case 'codigoPerfil':    
                this.setState({
                    codigoPerfil: newValue.toUpperCase()
                })
            break;   
        } 
    }
   
    _handleClick() {   
        this.props.dispatch(ActionsSearchPerfiles.consultaPerfiles(this.state));                        
    }
    _handleClickReset(){
        this.props.dispatch(ActionsSearchPerfiles.resetTable());
        this.setState({
            codigoPerfil: "",
            descripcion: "",
            estatus: "A",
        })
    }      
    _handleUpdateNombre = (chosenRequest) => {

        this.setState({
            descripcion: chosenRequest.toUpperCase()
        });
    };
    _handleUpdateEstatus = (event, index, value) => {

        this.setState({
            estatus: value
        });
    };

    
    render() {
        let mostrar={"display":((this.state.descripcion!=="")||(this.state.codigoPerfil!==""))?"block":"none", width:"80%", float:"right"};
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
                            searchText = {this.state.descripcion}                          
                            dataSource={this.props.catalogProfiles} 
                            filter={AutoComplete.caseInsensitiveFilter}                    
                            dataSourceConfig={dataSourceConfig}                            
                            onUpdateInput={this._handleUpdateNombre}
                        />
                    </div>
                    <div className="col m4 s4">
                        <TextField
                            hintText="Código"
                            name='codigoPerfil'                                                                                
                            floatingLabelText="Código"                            
                            value={this.state.codigoPerfil || ''}                 
                            onChange={this._handleChange}
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}                                                      
                            
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
                    <div className="col s3 offset-s7">
                        <RaisedButton
                            type="submit"                            
                            label="LIMPIAR BÚSQUEDA"
                            style={mostrar}
                            labelStyle={{color: "#2196F3"}}
                            onClick={this._handleClickReset}                            
                        />
                    </div>
                    <div className="col">
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
export default Searchprofiles;
/*
function mapStateToProps(state) {
    return { 
        todos: 
        state.todos 
    }
}
export default connect(mapStateToProps)(Searchprofiles)
*/
