/**
 * 
 */
import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';
/** Redux actions */
import * as MenuActions from 'actions/common/menu';
import * as DialogsActions from 'actions/common/dialogs';
import * as ConfigurationActions from 'actions/common/configuration';
/** Custom Constants */
import * as DialogsConstants from 'constants/dialogs';
import * as EndpointsConstants from 'constants/endpoints';
/**
 * Update Auth Data
 * @param {string} data
 * @return {function} dispatch the multiple actions
 */
export function updateAuthData(data) {
    return function(dispatch) {
        // Get the username part of the email
        let email = data.profileObj.email.match(/([^@]+)/g);
        dispatch(requestLoginEmployeesFindEmail(data.profileObj.email, data));
    };
}
/**
 * Request Employees Find Active
 * @param {string} email
 * @param {object} gapiAuthData
 * @return {function} dispatch multiples actions
 */
export function requestLoginEmployeesFindEmail(email, gapiAuthData) {
    return function(dispatch) {
        const params = {
            'email': email
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_LOGIN_SECURITY_CONSULT_USER_EMAIL, params, config)
        .then((response) => {
            if ( response.data.successful && _.size( response.data.payload ) > 0 && response.data.payload.estatus=='A' ) {                
                let userKey = response.data.payload.claveUsuario;
                dispatch(requestLoginEmployeesFindActive(userKey, gapiAuthData));
            } else {
                showErrorModal(dispatch, 'requestLoginEmployeesFindEmail IF');
            }
        })
        .catch(function(error) {
            showErrorModal(dispatch, 'requestLoginEmployeesFindEmail catch');
        });
    };
}
/**
 * Request Employees Find Active
 * @param {string} user
 * @param {object} gapiAuthData
 * @return {function} dispatch multiples actions
 */
export function requestLoginEmployeesFindActive(user, gapiAuthData) {
    return function(dispatch) {
        const params = {
            'usuario': user
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_LOGIN_EMPLOYEES_SEARCH_ACTIVE, params, config)
        .then((response) => {            
            if ( response.data.successful && _.size( response.data.payload ) > 0 ) {
                dispatch(requestSecurityConsultUsers(user));
                let ip = response.data.payload[0].ipUsuario;
                dispatch(requestRecordAccessLog(user, ip, 'http://clienteunico.findep.mx/'));
                dispatch(requestGetAccessLog(user));                
                dispatch({
                    type: 'UPDATE_AUTH_DATA',
                    payload: gapiAuthData
                });
                dispatch({
                    type: 'UPDATE_USER_INFO',
                    payload: response.data.payload[0]
                });
            } else {
                showErrorModal(dispatch);
            }
        })
        .catch(function(error) {
            showErrorModal(dispatch);
        });
    };
}
/**
 * Request Security Consult Users
 * @param {string} user
 * @return {function} dispatch actions
 */
export function requestSecurityConsultUsers(user) {
    return function(dispatch) {
        const params = {
            'claveUsuario': user,
            'facultades': [{}]
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_LOGIN_SECURITY_CONSULT_USERS, params, config)
        .then((response) => {
            //console.log("URI_LOGIN_SECURITY_CONSULT_USERS",response.data);
            if ( response.data.successful && _.size( response.data.payload ) > 0 ) {
                dispatch({
                    type: 'UPDATE_USER_PROFILES_FACULTIES',
                    payload: response.data.payload[0]
                });
                if ( !_.isUndefined(response.data.payload[0].facultades) ) {
                    let faculties = response.data.payload[0].facultades;
                    dispatch(MenuActions.updateMenuData(faculties,user));
                    // Show the configurations of the company
                    let userCanSeeSIF = false;
                    let userCanSeeSIC = false;
                    
                    _.each(faculties, (element, index) => {
                        // Check if the user can see the SIF
                        if ( element.modulo.codigoModulo === 'SIF' && userCanSeeSIF === false ) {
                            userCanSeeSIF = true;
                        }
                        // Check if the user can see the SIC
                        if ( element.modulo.codigoModulo === 'SIC' && userCanSeeSIC === false ) {
                            userCanSeeSIC = true;
                        }
                    });
                    dispatch(ConfigurationActions.updateUserCanSeeSIF(userCanSeeSIF));
                    dispatch(ConfigurationActions.updateUserCanSeeSIC(userCanSeeSIC));
                    if ( response.data.payload[0].facultades.length > 0) {
                       // dispatch(DialogsActions.updateUserWelcomeOpen(true));
                    }
                    
                }
                
            }
        })
        .catch(function(error) {
            console.log('error:', error);
        });
    };
}
/**
 * Request 
 * @param {string} user
 * @return {function} 
 */
export function requestRecordAccessLog(user, ip, url) {
    return function(dispatch) {
        const params = {
            'claveUsuario': user,
            'ipAddress': ip,
            'urlSolicitada': url,
            'fechaUltimoAcceso': moment().toDate(),
            'logAcciones': JSON.stringify('["login":{"claveUsuario":'+user+'}]').replace(/\\/g,'\\')
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_LOGIN_SECURITY_AUTHORIZATION_RECORD_ACCESS_LOG, params, config)
        .then((response) => {
        })
        .catch(function(error) {
            console.log('requestRecordAccessLog | error:', error);
        });
    };
}
/**
 * Request Get Access Log
 * @param {string} user
 * @return {function} 
 */
export function requestGetAccessLog(user) {
    return function(dispatch) {
        const params = {
            'claveUsuario': user
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_LOGIN_SECURITY_AUTHORIZATION_GET_ACCESS_LOG, params, config)
        .then((response) => {
            dispatch({
                type: 'UPDATE_USER_ACCESS_LOG',
                payload: response.data.payload
            });
        })
        .catch(function(error) {
            console.log('requestGetAccessLog | error:', error);
        });
    };
}
/**
 * Reset Auth Data
 * @return {object} 
 */
export function resetAuthData() {
    return {
        type: 'RESET_AUTH_DATA'
    };
}
/**
 * Update Session Timer
 * @return {object} 
 */
export function updateSessionTimer() {
    return {
        type: 'UPDATE_SESSION_TIMER',
        payload: moment().toDate()
    };
}
/**
 * Show error Modal
 * @return {function} dispatch the multiple actions
 */
export function showErrorModal(dispatch, title, content) {

    dispatch({
        type: 'UPDATE_DIALOGS_LOGIN_ERROR_TEXT',
        payload: DialogsConstants.DIALOGS_LOGIN_ERROR_TEXT_NOT_ACTIVE
    });
    dispatch({
        type: 'UPDATE_DIALOGS_LOGIN_ERROR_OPEN',
        payload: true
    });
}
