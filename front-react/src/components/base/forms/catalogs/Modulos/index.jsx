/**
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
/** Material-UI */
import Paper from 'material-ui/Paper';
import SearchModuls from './SearchModuls';
import NewsModuls from './NewsModuls';
import DTModulsEdit from './DTModulsEdit';
import DTModulsNews from './DTModulsNews';
import FormModulsEdit from './FormModulsEdit';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialogs from 'components/base/layout/Dialogs';
import * as CatalogsModuls from 'actions/forms/catalogs/modulos/SearchModulsActions';
import * as DialogsActions from 'actions/common/dialogs';

/** Custom styles */
const stylesProfiles = {
    //color: '#656565',
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
    constructor(props) {
        super(props);
    }
    /**
     * @desc Request the initial
     */
    componentWillMount() {
        this.props.dispatch(CatalogsModuls.resetTable());
        this.props.dispatch(CatalogsModuls.resetTableAdd());
        this.props.dispatch(CatalogsModuls.catModulos());
        this.props.dispatch(DialogsActions.resetState());
        this.props.dispatch(CatalogsModuls.resetObject());

    }

    render() {
        return (
            <div>

                <div style={stylesProfiles.borde}>
                    <p style={stylesProfiles.catalogo}>Seguridad > Catálogo Módulos</p>
                    <p style={stylesProfiles.catalogoTitulo}>Catálogo Módulos</p>
                </div>
                <Dialogs />
                <Paper style={stylesProfiles.borde}>
                    <Card>
                        <CardHeader
                            title="Módulos existentes"
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />
                        <CardText style={{paddingTop:17}} expandable={true}>
                            <SearchModuls/>
                            <DTModulsEdit/>
                            <FormModulsEdit/>
                        </CardText >
                    </Card>
                </Paper><br/>
                <Paper style={stylesProfiles.borde}>
                    <Card>
                        <CardHeader
                            title="Registro de Nuevo Módulo"
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />
                        <CardText style={{padding: 0}} expandable={true}>
                            <NewsModuls/>
                            <DTModulsNews/>
                            <FormModulsEdit/>
                        </CardText >
                    </Card>
                </Paper>
            </div>
        );
    }
}
export default Index;