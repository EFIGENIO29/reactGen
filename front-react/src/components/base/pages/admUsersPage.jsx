/**
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText, FlatButton, Paper, RaisedButton, TextField} from "material-ui";
import DataTable from "../generic/DataTable/DataTable";

@connect((store) => {
    return {
    };
})

    /**
     *
     */
class admUsersPage extends Component {
    constructor (props) {
        super(props);

        this.headers = [
            {
                "key": "sucursal",
                "label": "Sucursal",
                "sortable": true
            },
            {
                "key": "estatus",
                "label": "Estatus",
                "sortable": true
            },{
                "key": "sucursal1",
                "label": "Sucursal1",
                "sortable": true
            }
        ];
        this.handleRowSelection = this.handleRowSelection.bind(this);
    }
    handleRowSelection(e){
        console.log(e);
    };
    render() {
        let datos=[
            {
                "sucursal":"A",
                "estatus":"Inactivo",
                "sucursal1":"A",
            },{
                "sucursal":"B",
                "estatus":"Activo",
                "sucursal1":"A",
            },{
                "sucursal":"C",
                "estatus":"Inactivo",
                "sucursal1":"A",
            },{
                "sucursal":"D",
                "estatus":"Activo",
                "sucursal1":"A",
            },{
                "sucursal":"E",
                "estatus":"Inactivo",
                "sucursal1":"A",
            },{
                "sucursal":"A",
                "estatus":"Activo",
                "sucursal1":"A",
            },{
                "sucursal":"F",
                "estatus":"Inactivo",
                "sucursal1":"A"}];
        return (
            <div>
                <h6>Adminstración de usuarios</h6>
                <Paper >
                    <Card >
                        <CardHeader
                            title="Usuarios existentes"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <div className="row">
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Nombre"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Apellido Paterno"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Apellido Materno"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="No. de empleado"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col m12 offset-m11">
                                    <RaisedButton label="Buscar" disabled={true} />
                                </div>
                            </div>
                        </CardText>
                    </Card>
                </Paper>
                <DataTable
                    data={datos}
                    headers={this.headers}
                    showCheckboxes={true}
                    enableSelectAll={false}
                    multiSelectable={false}
                    selectable={true}
                    onRowSelection={this.handleRowSelection}
                />
                <Paper>
                    <Card>
                        <CardHeader
                            title="Registro de nuevo usuario"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <div className="row">
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Nombre"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Apellido Paterno"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Apellido Materno"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="No. de empleado"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Nombre de usuario"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Correo electrónico"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="RFC"
                                    />
                                </div>
                                <div className="col m3">
                                    <TextField
                                        floatingLabelText="Teléfono"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col m12 offset-m11">
                                    <RaisedButton label="Registrar" disabled={true} />
                                </div>
                            </div>
                        </CardText>
                    </Card>
                </Paper>
            </div>
        );
    }
}
export default admUsersPage;