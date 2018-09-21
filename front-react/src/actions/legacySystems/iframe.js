/**
 * 
 */
import axios from 'axios';
import _ from 'underscore';
/** Custom Constants */
import * as EndpointsConstants from 'constants/endpoints';

/**
 * @function updateIFrameURI
 * @desc Updates the URI of the selected IFrame
 * @param {Object} params The value to compare 
 * @param {Object} menuData The value to compare 
 */
export function updateIFrameURI(params, menuData, user, company) {
    return (dispatch) => {
        if ( !_.isUndefined(params) && _.size(params) > 0 ) {
            let element = null;
            let urlParams = {};
            let url = null;
            _.each(menuData, (row) => {
                if ( element === null ) {
                    element = _.find(row.menus, function (o) {
                        if ( o === null ) {
                            return false;
                        } else {
                            return o.codigoMenu === params;
                        }
                    });
                    element = _.isUndefined(element) ? null : element ;
                }
            });
            if ( element !== null && !_.isUndefined(element.codigoPadre) ) {
                if ( element.codigoPadre === 'mnu_sic' || element.codigoPadre === 'mnu_sif' ) {
                    let valid = getParams(dispatch, element.codigoPadre, element.codigoMenu, element.url, user, company);
                } else {
                    url = (element !== null) ? element.url : null ;
                    dispatch({
                        type: 'UPDATE_LEGACYSYSTEMS_IFRAME_URI',
                        payload: url
                    });
                }
            }
        } else {
            dispatch({
                type: 'ERROR_LEGACYSYSTEMS_IFRAME_URI',
                payload: null
            });
        }
    };
}
/**
 * 
 * @param {*} dispatch 
 * @param {*} parentKey 
 * @param {*} childKey 
 * @param {*} url 
 * @param {*} user 
 * @param {*} company 
 */
function getParams(dispatch, parentKey, childKey, url, user, company) {
    let urlParams = {};
    let system = null;
    let subsystem = null;
    const params = {};
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    };
    if ( parentKey === 'mnu_sic' ) {
        system = 'sic';
        console.log('getParams | parentKey/childKey:', parentKey, childKey);
        switch( childKey ) {
            // SastreWeb
            case 'mnu_sic_01':
                subsystem = 'sastre';
                urlParams = {
                    sesCveSucursal: 'claveSucursal',
                    sesCveUsuario: 'usuario',
                    sesFacConfirmar: 'facultad'
                };
            break;
            // ConexiaWeb
            case 'mnu_sic_02':
                subsystem = 'conexia';
                urlParams = {
                    sesCveUsuario: 'claveUsuario',
                    sesCveSucursal: 'claveSucursal',
                    sesCveEmpresa: 'claveEmpresa',
                    sesIpUser: 'ipUsuario',
                    sesHostUser: 'ipUsuario',
                    sesPerfil: 'perfil',
                    sesSistema: null,
                    sesFacultad: null
                }
            break;
            // Cobranza
            case 'mnu_sic_03':
                subsystem = 'cobranza';
            break;
            // sic/servcobranza
            case 'mnu_sic_04':
                subsystem = null;
                urlParams = {
                    parCveSistema: 'sistema',
                    parCvePerfil: 'perfil',
                    parCveFacPant: 'facultad',
                    parCveUsr: 'claveUsuario'
                }
            break;
        }
        axios.post(EndpointsConstants.URI_LOGIN_EMPLOYEES + '/' + company + '/' + system + '/' + subsystem + '/' + user, params, config)
            .then((response) => {
                if ( response.data.successful ) {
                    let payload = response.data.payload;
                    if ( _.size(urlParams) > 0 ) {
                        _.each(urlParams, (value, key) => {
                            urlParams[key] = (!_.isUndefined(payload[value])) ? payload[value] : '' ;
                        });
                        var finalParams = Object.keys(urlParams).map(function(key) {
                            return key + '=' + encodeURIComponent(urlParams[key]);
                        }).join('&');
                        console.log('getParams | finalParams > mnu_sic:', finalParams);
                        url = url + '?' + finalParams;
                    }
                    dispatch({
                        type: 'UPDATE_LEGACYSYSTEMS_IFRAME_URI',
                        payload: url
                    });
                }
            });
    } else if ( parentKey === 'mnu_sif' ) {
        system = 'sif';
        subsystem = null;
        switch( childKey ) {
            case 'mnu_sif_01':
                urlParams = {
                    gsCveSucursal: 'claveSucursal',
                    gsCveCentroCosto: 'claveCentroCosto',
                    gsCveEmpresa: 'claveEmpresa',
                    gsCveUsuario: 'claveUsuario',
                    usuario: 'usuario',
                    departamento: 'departamento',
                    nombre: 'nombre',
                }
            break;
        }
        axios.post(EndpointsConstants.URI_LOGIN_EMPLOYEES + '/' + company + '/' + system + '/' + subsystem + '/' + user, params, config)
            .then((response) => {
                if ( response.data.successful ) {
                    let payload = response.data.payload;
                    if ( _.size(urlParams) > 0 ) {
                        _.each(urlParams, (value, key) => {
                            urlParams[key] = (!_.isUndefined(payload[value])) ? payload[value] : '' ;
                        });
                        var finalParams = Object.keys(urlParams).map(function(key) {
                            return key + '=' + encodeURIComponent(urlParams[key]);
                        }).join('&');
                        console.log('getParams | finalParams > mnu_sif:', finalParams);
                        url = url + '&' + finalParams;
                    }
                    dispatch({
                        type: 'UPDATE_LEGACYSYSTEMS_IFRAME_URI',
                        payload: url
                    });
                }
            });
    } else {
        return url;
    }
}
/**
 * @function updateMenuKey
 * @desc Updates the selected menu key
 * @param {string} value The value to update 
 */
export function updateMenuKey(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_MENU_KEY',
            payload: value
        });
    };
}
/**
 * @function updateGAPIsLoaded
 * @desc Updates the flag that indicates if the GAP legacy component is loaded
 * @param {boolean} value The value of the flag
 */
export function updateGAPIsLoaded(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_GAP_LOADED',
            payload: value
        });
    };
}
/**
 * @function updateSICIsLoaded
 * @desc Updates the flag that indicates if the SIC legacy component is loaded
 * @param {boolean} value The value of the flag
 */
export function updateSICIsLoaded(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_SIC_LOADED',
            payload: value
        });
    };
}
/**
 * @function updateSICMenuKey
 * @desc Updates the string that indicates what menu option is selected
 * @param {string} value The value of the menu key
 */
export function updateSICMenuKey(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_SIC_MENU_KEY',
            payload: value
        });
    };
}
/**
 * @function updateSIFIsLoaded
 * @desc Updates the flag that indicates if the SIC legacy component is loaded
 * @param {boolean} value The value of the flag
 */
export function updateSIFIsLoaded(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_SIF_LOADED',
            payload: value
        });
    };
}
/**
 * @function updateBUROIsLoaded
 * @desc Updates the flag that indicates if the BURO legacy component is loaded
 * @param {boolean} value The value of the flag
 */
export function updateBUROIsLoaded(value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LEGACYSYSTEMS_BURO_LOADED',
            payload: value
        });
    };
}

export function resetIFrameURI() {
    return (dispatch) => {
        dispatch({
            type: 'RESET_LEGACYSYSTEMS_IFRAME_URI'
        });
    };   
}

/**
 * @function resetIframeState
 * @desc Reset the iframe state
 */
export function resetIframeState() {
    return (dispatch) => {
        dispatch({
            type: 'RESET_LEGACYSYSTEMS'
        });
    };
}
