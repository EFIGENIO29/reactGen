/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialogs from 'components/base/layout/Dialogs';

import SearchFacultades from 'components/base/forms/catalogs/Facultades/SearchFacultades';
import NewFacultades from 'components/base/forms/catalogs/Facultades/NewFacultades';
import DTFacultadesEdit from './DTFacultadesEdit';
import DTFacultadesNews from './DTFacultadesNews';
import FormFacultadEdit from './FormFacultadEdit';
import * as CatalogsFacultades from 'actions/forms/catalogs/facultades/SearchFacultadesActions';
import * as CatalogsModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';
/** Custom styles */
const stylesProfiles = {
    catalogo:{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: "12px",
        color: "#656565"
    },
    catalogoTitulo:{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize: "21px",
        color: "#BE2E2E"
    },
    borde: {
        margin: "15px 15px 15px 15px"
    }
};
@connect((store) => {
    return {
    };
})

/**
 * 
 */
class Index extends Component {
  constructor (props) {
    super(props);
  }
    componentWillMount() {
        this.props.dispatch(CatalogsFacultades.resetTable());
        this.props.dispatch(CatalogsFacultades.resetTableAdd());
        this.props.dispatch(CatalogsFacultades.catFacultades());
        this.props.dispatch(CatalogsModuls.catModulos());

       // this.props.dispatch(DialogsActions.resetState());

    }
  render() {
    return (
        <div>

            <div style={stylesProfiles.borde}>
                <p style={stylesProfiles.catalogo}>Seguridad > Catálogo Facultades</p>
                <p style={stylesProfiles.catalogoTitulo}>Catálogo Facultades</p>
            </div>
            <Dialogs />
            <Paper style={stylesProfiles.borde}>
                <Card>
                    <CardHeader
                        title="Facultades existentes"
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{    paddingLeft: 25,
                            paddingTop: 20,
                            paddingBottom: 16}}
                    />
                    <CardText style={{paddingTop: 17}} expandable={true}>
                        <SearchFacultades/>
                        <DTFacultadesEdit/>
                        <FormFacultadEdit/>
                    </CardText >
                </Card>
            </Paper><br/>
            <Paper style={stylesProfiles.borde}>
                <Card>
                    <CardHeader
                        title="Registro de nueva Facultad"
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{    paddingLeft: 25,
                            paddingTop: 20,
                            paddingBottom: 16}}
                    />
                    <CardText style={{padding: 0}} expandable={true}>
                        <NewFacultades/>
                        <DTFacultadesNews/>
                        <FormFacultadEdit/>
                    </CardText >
                </Card>
            </Paper>
        </div>
    );
  }
}
export default Index;