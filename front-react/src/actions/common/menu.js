/**
 *
 */
import axios from 'axios';
import _ from 'underscore';
import * as EndpointsConstants from 'constants/endpoints';
/** HardCode: Examle of data */
//import menuData from '../../api/seguridad-autorizacion-consultarMenus';
/**
 * @function updateMenuData
 * @desc Make an AJAX request to get the data of the menu
 */
export function updateMenuData(faculties,user) {

    return (dispatch) => {
        const params = {"claveUsuario": user};
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        /*
         dispatch({
         type: 'UPDATE_MENU_DATA',
         payload: menuData.payload
         });
         */
        axios.post(EndpointsConstants.URI_MENU_CONSULT, params, config).then(
            (response) => {
                if ( response.data.successful && _.size( response.data.payload ) > 0 ) {

                    dispatch({
                        type: 'UPDATE_MENU_DATA',
                        payload: response.data.payload
                    });


                    /*  let menuData = [];
                     // Get only the parent items

                     _.each(faculties, (faculty, indexFaculty) => {
                     _.each(response.data.payload, (menuItem, menuIndex) => {

                     // Check if the faculty exists in the array
                     let found = _.find(menuItem.facultades, function(item) {
                     return item.codigoFacultad === faculty.codigoFacultad;
                     });
                     if ( !_.isUndefined(found) ) {
                     // Check if the element exists in the array
                     let alreadyRegistered = _.find(menuData, function(item) {
                     return item.codigoMenu === menuItem.codigoMenu;
                     });
                     if ( _.isUndefined(alreadyRegistered) ) {
                     menuData.push(menuItem);
                     }
                     }
                     });
                     });
                     // Get the child elements
                     _.each(menuData, (element, menuIndex) => {
                     _.each(element.menus, (menuItem, subIndex) => {

                     let found = false;
                     _.each(faculties, (faculty, indexFaculty) => {
                     let founded = _.find(menuItem.facultades, (item) => {
                     return item.codigoFacultad === faculty.codigoFacultad;
                     });
                     if ( !_.isUndefined(founded) ) {
                     found = true;
                     }
                     });
                     // Delete the element from the menu
                     if ( found === false ) {
                     delete menuData[menuIndex].menus[subIndex];
                     }
                     });
                     });

                     dispatch({
                     type: 'UPDATE_MENU_DATA',
                     payload: response.data.payload
                     });*/
                }
            },
            (error) => {
                dispatch({
                    type: 'ERROR_MENU_DATA',
                    payload: error
                });
            }
        );
    };
}
/**
 * @function updateMenuOpen
 * @desc Updates the flag that indicates if the menu is open
 * @param {boolean} value The value of the flag
 */
export function updateMenuOpen(value) {
    return {
        type: 'UPDATE_MENU_OPEN',
        payload: value
    };
}
/**
 * @function resetMenuState
 * @desc Reset the menu state
 */
export function resetMenuState() {
    return {
        type: 'RESET_MENU'
    };
}
export function updateURL(value) {
    return {
        type: 'UPDATE_URL',
        payload: value
    };
}