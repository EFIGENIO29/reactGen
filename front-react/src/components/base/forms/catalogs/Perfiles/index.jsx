/**
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
/** Material-UI */
import Paper from 'material-ui/Paper';
import Searchprofiles from 'components/base/forms/catalogs/Perfiles/Searchprofiles';
import Newsprofiles from 'components/base/forms/catalogs/Perfiles/Newsprofiles';
import DTProfilesEdith from 'components/base/forms/catalogs/Perfiles/DTProfilesEdith';
import DTProfilesNews from 'components/base/forms/catalogs/Perfiles/DTProfilesNews';
import FormProfilesEdith from 'components/base/forms/catalogs/Perfiles/FormProfilesEdith';

import DragandDrop from 'components/base/forms/catalogs/Perfiles/DndProfiles';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialogs from 'components/base/layout/Dialogs';
import * as CatalogsActions from 'actions/forms/catalogs/catalogs';
import * as DialogsActions from 'actions/common/dialogs';
import * as ActionsSearchPerfiles from 'actions/forms/catalogs/perfiles/Searchprofiles';
import * as ActionsPerfilesNews from 'actions/forms/catalogs/perfiles/Newsprofiles';

//import * as DialogsActions from 'actions/common/dialogs';
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
      this.props.dispatch(ActionsSearchPerfiles.ResetAsignedDND()); 
      this.props.dispatch(CatalogsActions.resetProfiles());
      this.props.dispatch(CatalogsActions.requestCatalog('perfiles'));                 
      this.props.dispatch(DialogsActions.resetState());      
      this.props.dispatch(CatalogsActions.requestCatalogFaculties());      
      this.props.dispatch(ActionsSearchPerfiles.resetTable());
      this.props.dispatch(ActionsPerfilesNews.resetTableTablePerfilesNews());
    }   
     
    render() {
        return (
            <div>
            
                <div style={stylesProfiles.borde}>    
                    <p style={stylesProfiles.catalogo}>Seguridad > Catálogo Perfiles</p>
                    <p style={stylesProfiles.catalogoTitulo}>Catálogo Perfiles</p>                
                </div>
                <Dialogs />
                <Paper style={stylesProfiles.borde}>
                    <Card>
                        <CardHeader
                            title="Perfiles existentes"                    
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />                   
                        <CardText style={{paddingTop:17}} expandable={true}>
                            <Searchprofiles/>                         
                            <DTProfilesEdith/>
                            <FormProfilesEdith/>
                            <DragandDrop/>
                        </CardText >
                    </Card>
                </Paper><br/>
                <Paper style={stylesProfiles.borde}>                    
                    <Card>
                        <CardHeader
                            title="Registro de nuevo Perfil"                    
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={{    paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 16}}
                        />                   
                        <CardText style={{paddingTop: 17}} expandable={true}>
                            <Newsprofiles/>  
                            <DTProfilesNews/>                                                   
                            <FormProfilesEdith/>
                        </CardText >
                    </Card>
                </Paper>                
            </div>
        );
    }
}
export default Index;


