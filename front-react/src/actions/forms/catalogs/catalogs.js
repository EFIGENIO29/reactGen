/**
 * 
 */
import axios from 'axios';
import _ from 'underscore';

import * as DialogsActions from 'actions/common/dialogs';

import * as EndpointsConstants from 'constants/endpoints';
/**
 * Request a catalog
 * @return {function} dispatch multiple actions
 */
export function requestCatalog( type) {
    return function(dispatch) {        
        if ( _.size( type ) > 0 ) {
            let params = {};
            let config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
            switch( type ) {
                case 'perfiles':
                    params = {}
                break;
            }
            let catPerfiles = [];
            axios.post(EndpointsConstants.URI_SECURITY_PROFILE_CONSULT, params, config)
            .then((response) => {
                
                if ( response.data.successful && _.size( response.data.payload ) > 0 ) {
                    let data = response.data.payload.map((element) => {
                        
                        catPerfiles.push(  {
                            valueKey: element.codigoPerfil,
                            textKey: element.nombre
                        });

                    });
                    
                    dispatch({
                        type: 'UPDATE_CATALOGS_PERFILES',
                        payload: catPerfiles
                    });
                        
                }
            })
            .catch(function(error) {
                console.log('error:', error);
            });
        }
    };
}
export function requestCatalogProfilesUser( type) {
    return function(dispatch) {        
        if ( _.size( type ) > 0 ) {
            let params = {};
            let config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
            switch( type ) {
                case 'perfiles':
                    params = {}
                break;
            }
            let catProgiles = [];
            axios.post(EndpointsConstants.URI_SECURITY_PROFILE_CONSULT, params, config)
            .then((response) => {
                
                if ( response.data.successful && _.size( response.data.payload ) > 0 ) {                    
                    
                    let data = response.data.payload.map((element) => {
                        
                        if(element.estatus=='A'){
                            catProgiles.push(  {
                                id: element.codigoPerfil.toUpperCase(),
                                text: element.descripcion.toUpperCase(),
                                modulo: element.nombre.toUpperCase(),
                                exists:false
                            });
                        }    

                    });

                    dispatch({
                        type: 'UPDATE_CATALOGS_USER_PROFILES',
                        payload: catProgiles
                    });
                        
                }
            })
            .catch(function(error) {
                console.log('error:', error);
            });
        }
    };
}
export function resetCatUsarProfiles() {
    return {
        type: 'RESET_CATALOGS_USER_PROFILES'
    };
}

export function resetState() {
    return {
        type: 'RESET_CATALOGS_STATE'
    };
}


export function resetFaculties() {
    return {
        type: 'RESET_CATALOGS_STATE_FACULTIES'
    };
}
export function resetProfiles() {
    return {
        type: 'RESET_CATALOGS_STATE_PROFILES'
    };
}


/**
 * Request a catalog
 * @return {function} dispatch multiple actions
 */
export function requestCatalogFaculties() {
    return function(dispatch) {        
        
        let params = {};
        let config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        let catFacultades = [];
        axios.post(EndpointsConstants.URI_SECURITY_FACULTY_CONSULT, params, config)
        .then((response) => {
            
            if ( response.data.successful && _.size( response.data.payload ) > 0 ) {                

                let data = response.data.payload.map((element) => {                    
                    if(element.estatus=='A'){
                        catFacultades.push(  {
                            id: element.codigoFacultad.toUpperCase(),
                            text: element.descripcion.toUpperCase(),
                            modulo: element.modulo.descripcion.toUpperCase(),
                            exists:false
                        });
                    }
                });

                dispatch({
                    type: 'UPDATE_CATALOGS_FACULTADES',
                    payload: catFacultades
                });
                    
            }
        })
        .catch(function(error) {
            console.log('error:', error);
        });
        
    };
}
export function requestCatalogFacultiesFilter(facultiesListFilter) {
    return function(dispatch) {     
        dispatch({
            type: 'UPDATE_CATALOGS_FACULTADES_FILTRO',
            payload: facultiesListFilter
        });
    }
}
export function resetCatalogFacultiesFilter() {
    return function(dispatch) {     
        dispatch({
            type: 'RESET_CATALOGS_STATE_FILTER'
        });
    }
}