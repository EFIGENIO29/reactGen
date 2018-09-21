/**
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialogs from 'components/base/layout/Dialogs';
import * as CatalogsActions from 'actions/forms/catalogs/catalogs';
import * as DialogsActions from 'actions/common/dialogs';
import DragandDropUsersProfiles from 'components/base/forms/catalogs/Usuarios/DndUserProfiles';
import DragandDropUsersFaculties from 'components/base/forms/catalogs/Usuarios/DndUserFaculties';
import SearchUsers from 'components/base/forms/catalogs/Usuarios/SearchUsers';
import NewsUsers from 'components/base/forms/catalogs/Usuarios/NewsUsers';
import DTUsersEdit from './DTUsersEdit';
import DTUsersNews from './DTUsersNews';
import FormUserEdit from './FormUsersEdit';
import FormUsersSuc from './FormUsersSuc';


import * as CatalogsUsers from 'actions/forms/catalogs/usuarios/SearchUsersActions';
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
        this.props.dispatch(CatalogsUsers.resetTable());
        this.props.dispatch(CatalogsUsers.resetTableAdd());
        this.props.dispatch(CatalogsUsers.catEmpresa());
        this.props.dispatch(CatalogsUsers.resetSucursal());
        this.props.dispatch(CatalogsActions.resetCatUsarProfiles());
        this.props.dispatch(DialogsActions.resetValidationOpenUF(false));
        this.props.dispatch(DialogsActions.resetValidationOpenUS(false));
        this.props.dispatch(DialogsActions.updateValidationOpenUP(false));
        this.props.dispatch(CatalogsActions.requestCatalogProfilesUser('perfiles'));                 
        /* this.props.dispatch(CatalogsFacultades.resetTableAdd());

         */
        // this.props.dispatch(DialogsActions.resetState());

    }
    render() {
        return (
            <div>

                <div style={stylesProfiles.borde}>
                    <p style={stylesProfiles.catalogo}>Seguridad > Administración Usuarios</p>
                    <p style={stylesProfiles.catalogoTitulo}>Administración Usuarios</p>
                </div>
                <Dialogs />
                <Paper style={stylesProfiles.borde}>
                    <Card>
                        <CardHeader
                            title="Usuarios existentes"
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />
                        <CardText style={{paddingTop: 17}} expandable={true}>
                            <SearchUsers/>
                            <DTUsersEdit/>
                            <FormUserEdit/>
                            <FormUsersSuc/>
                            <DragandDropUsersProfiles/>
                            <DragandDropUsersFaculties/>
                        </CardText >
                    </Card>
                </Paper><br/>
                <Paper style={stylesProfiles.borde}>
                    <Card>
                        <CardHeader
                            title="Registro de nuevo Usuario"
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />
                        <CardText style={{padding: 0}} expandable={true}>
                            <NewsUsers/>
                            <DTUsersNews/>
                            <FormUserEdit/>
                        </CardText >
                    </Card>
                </Paper>
            </div>
        );
    }
}
export default Index;