/**
 *
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/**  */
import commonAuth from './common/auth';
import commonDialogs from './common/dialogs';
import commonMenu from './common/menu';
import commonGapi from './common/gapi';
/**  */
import commonLayout from './common/layout';
/** User Configuration */
import commonConfiguration from './common/configuration';
import dnd from './common/dnd';
/**  */
import legacySystemsIframe from './legacySystems/iframe';
/**  Catalogs*/
import catSearchProfiles from './forms/catalogs/perfiles/searchprofiles';
import catNewProfiles from './forms/catalogs/perfiles/newprofiles';
import catProfiles from './forms/catalogs/catalogs';

import catModuls from './forms/catalogs/modulos/searchModulsApi';
import catSearchModuls from './forms/catalogs/modulos/searchModulsApi';
import catNewModuls from './forms/catalogs/modulos/searchModulsApi';

import catFacultades from './forms/catalogs/facultades/facultadesApi';
import catSearchFacultades from './forms/catalogs/facultades/facultadesApi';
import catSearchUsuarios from './forms/catalogs/usuarios/usuariosApi';
import catMenuP from './forms/catalogs/facultades/facultadesApi';

import menuArbol from './forms/catalogs/facultades/facultadesApi';

import {reducer as toastr} from "react-redux-toastr";
/**
 *
 */
export default combineReducers({
    commonAuth,
    commonDialogs,
    commonMenu,
    commonGapi,
    commonLayout,
    commonConfiguration,
    legacySystemsIframe,
    routing: routerReducer,
    catSearchProfiles,
    catNewProfiles,
    catProfiles,
    catModuls,
    catNewModuls,
    catSearchModuls,
    catFacultades,
    catSearchFacultades,
    catMenuP,
    menuArbol,
    catSearchUsuarios,
    toastr,
    dnd
});